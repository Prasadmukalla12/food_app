import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'
import { promisify } from 'node:util'

const deriveKey = promisify(scrypt)
const sessionAge = 60 * 60 * 24 * 7
const cookieName = 'delicious_session'
const digest = value => createHash('sha256').update(value).digest('hex')

function respond(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
  res.end(JSON.stringify(body))
}

async function readBody(req) {
  if (req.headers['content-type']?.split(';')[0] !== 'application/json') return null
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size <= 4096) chunks.push(chunk)
  }
  if (size > 4096) return null
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return null
  }
}

export function createAuthHandler({
  secure = false,
  database = process.env.AUTH_DB_PATH || fileURLToPath(new URL('../.data/auth.sqlite', import.meta.url)),
} = {}) {
  if (database !== ':memory:') mkdirSync(dirname(database), { recursive: true })
  const db = new DatabaseSync(database)
  db.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
      salt TEXT NOT NULL, password_hash TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id), expires INTEGER NOT NULL
    );
  `)
  const findUser = db.prepare('SELECT * FROM users WHERE email = ?')
  const addUser = db.prepare('INSERT INTO users (name, email, salt, password_hash) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING')
  const addSession = db.prepare('INSERT INTO sessions VALUES (?, ?, ?)')
  const deleteSession = db.prepare('DELETE FROM sessions WHERE token_hash = ?')
  const deleteExpired = db.prepare('DELETE FROM sessions WHERE expires <= ?')
  const findSession = db.prepare('SELECT name, email FROM sessions JOIN users ON users.id = sessions.user_id WHERE token_hash = ? AND expires > ?')

  function setCookie(res, token, age) {
    res.setHeader('Set-Cookie', `${cookieName}=${token}; Path=/; Max-Age=${age}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`)
  }

  const attempts = new Map()
  function allowAttempt(address) {
    const now = Date.now()
    for (const [ip, entry] of attempts) {
      if (entry.expires <= now) attempts.delete(ip)
    }
    if (!attempts.has(address)) attempts.set(address, { count: 0, expires: now + 60_000 })
    const entry = attempts.get(address)
    entry.count += 1
    return entry.count <= 20
  }

  async function handle(req, res) {
    try {
      const path = req.url.split('?')[0]
      const token = req.headers.cookie?.match(/(?:^|;\s*)delicious_session=([a-f0-9]{64})(?:;|$)/)?.[1]
      const tokenHash = token ? digest(token) : null
      if (path === '/session' && req.method === 'GET') {
        const user = tokenHash ? findSession.get(tokenHash, Date.now()) : null
        return respond(res, 200, { user: user ?? null })
      }

      if (req.method !== 'POST' || !['/register', '/login', '/logout'].includes(path)) {
        return respond(res, 404, { message: 'Endpoint not found.' })
      }
      const origin = req.headers.origin
      if (origin && new URL(origin).host !== req.headers.host) {
        return respond(res, 403, { message: 'Request origin is invalid.' })
      }
      if (path === '/logout') {
        if (tokenHash) deleteSession.run(tokenHash)
        setCookie(res, '', 0)
        return respond(res, 200, { user: null })
      }
      if (!allowAttempt(req.socket.remoteAddress)) {
        return respond(res, 429, { message: 'Too many attempts. Try again in a minute.' })
      }

      const body = await readBody(req)
      const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
      const password = typeof body?.password === 'string' ? body.password : ''
      if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 128) {
        return respond(res, 400, { message: 'Enter a valid email and password.' })
      }

      let user
      if (path === '/register') {
        const name = typeof body.name === 'string' ? body.name.trim() : ''
        if (!name || name.length > 80 || password.length < 8) {
          return respond(res, 400, { message: 'Enter a name and a password with at least 8 characters.' })
        }
        const salt = randomBytes(16).toString('hex')
        const hash = await deriveKey(password, salt, 64)
        const result = addUser.run(name, email, salt, hash.toString('hex'))
        if (!result.changes) return respond(res, 409, { message: 'This email already has an account. Sign in instead.' })
        user = { id: result.lastInsertRowid, name, email }
      } else {
        user = findUser.get(email)
        const hash = await deriveKey(password, user?.salt ?? '00000000000000000000000000000000', 64)
        if (!user || !timingSafeEqual(hash, Buffer.from(user.password_hash, 'hex'))) {
          return respond(res, 401, { message: 'Email or password is incorrect.' })
        }
      }

      if (tokenHash) deleteSession.run(tokenHash)
      deleteExpired.run(Date.now())
      const newToken = randomBytes(32).toString('hex')
      addSession.run(digest(newToken), user.id, Date.now() + sessionAge * 1000)
      setCookie(res, newToken, sessionAge)
      return respond(res, path === '/register' ? 201 : 200, { user: { name: user.name, email: user.email } })
    } catch (error) {
      console.error('Authentication request failed', error)
      if (!res.destroyed) respond(res, 500, { message: 'Something went wrong. Please try again.' })
    }
  }

  return { handle, close: () => db.close() }
}

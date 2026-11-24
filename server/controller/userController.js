import { Buffer } from 'node:buffer'
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const hashPassword = promisify(scrypt)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const wrongCredentials = 'Email or password is incorrect.'

function readAccount(body) {
  return {
    name: typeof body?.name === 'string' ? body.name.trim() : '',
    email: typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '',
    password: typeof body?.password === 'string' ? body.password : '',
  }
}

function validCredentials(email, password) {
  const validEmail = email.length <= 254 && emailPattern.test(email)
  return validEmail && password.length > 0 && password.length <= 128
}

export function createUserController(users) {
  async function register(req, res) {
    const { name, email, password } = readAccount(req.body)
    if (!validCredentials(email, password)) {
      return res.status(400).json({ message: 'Enter a valid email and password.' })
    }
    if (!name || name.length > 80 || password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Enter a name and a password with at least 8 characters.' })
    }

    const salt = randomBytes(16).toString('hex')
    const hash = await hashPassword(password, salt, 64)
    try {
      await users.createUser({ name, email, salt, password_hash: hash.toString('hex') })
    } catch (error) {
      if (error.code !== 11000) throw error
      return res
        .status(409)
        .json({ message: 'This email already has an account. Sign in instead.' })
    }

    res.status(201).json({ user: { name, email } })
  }

  async function login(req, res) {
    const { email, password } = readAccount(req.body)
    if (!validCredentials(email, password)) {
      return res.status(400).json({ message: 'Enter a valid email and password.' })
    }

    const user = await users.findByEmail(email)
    const hash = await hashPassword(password, user?.salt ?? '0'.repeat(32), 64)
    if (!user || !timingSafeEqual(hash, Buffer.from(user.password_hash, 'hex'))) {
      return res.status(401).json({ message: wrongCredentials })
    }

    res.json({ user: { name: user.name, email: user.email } })
  }

  return { register, login }
}

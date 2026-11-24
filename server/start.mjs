import { createServer } from 'node:http'
import { createReadStream, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createAuthHandler } from './auth.mjs'

const root = fileURLToPath(new URL('../dist', import.meta.url))
const index = resolve(root, 'index.html')
if (!existsSync(index)) throw new Error('Run npm run build before starting the server.')

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}
const auth = createAuthHandler({ secure: process.env.COOKIE_SECURE === 'true' })
const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (path.startsWith('/api/auth/')) {
      req.url = path.slice('/api/auth'.length)
      await auth.handle(req, res)
      return
    }
    if (path.startsWith('/api/') || !['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(404).end()
      return
    }
    const extension = extname(path)
    const file = extension ? resolve(root, '.' + path) : index
    if (!file.startsWith(root + sep) || (extension && !types[extension])) {
      res.writeHead(404).end()
      return
    }
    const info = await stat(file)
    if (!info.isFile()) {
      res.writeHead(404).end()
      return
    }
    res.writeHead(200, { 'Content-Type': types[extname(file)], 'Content-Length': info.size })
    if (req.method === 'HEAD') res.end()
    else createReadStream(file).on('error', () => res.destroy()).pipe(res)
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 404 : 400).end()
  }
})

const port = Number(process.env.PORT || 4173)
const host = process.env.HOST || '127.0.0.1'
server.once('close', auth.close)
server.listen(port, host, () => console.log(`Delicious is listening on http://${host}:${port}`))

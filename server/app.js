import { existsSync } from 'node:fs'
import { extname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { connectDB } from './config/db.js'
import { createUserModel } from './models/userModels.js'
import { createUserRoutes } from './routes/userRoutes.js'

export async function createServer(env = process.env, storefront) {
  const { db, close } = await connectDB(env)
  const users = await createUserModel(db).catch(async error => {
    await close()
    throw new Error('Could not initialize the users collection (' + error.name + ').')
  })
  const app = express()
  app.disable('x-powered-by')
  app.use('/api/auth', createUserRoutes(users))

  app.use('/api', (_req, res) => {
    res.status(404).json({ message: 'Endpoint not found.' })
  })
  app.use('/api', (error, _req, res, next) => {
    if (res.headersSent) return next(error)
    if (error.status === 400 || error.status === 413) {
      return res.status(error.status).json({ message: 'Invalid request body.' })
    }
    console.error('Account request failed:', error.name)
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  })

  if (storefront) {
    app.use(express.static(storefront, { redirect: false }))
    app.get('/{*path}', (req, res) => {
      if (extname(req.path)) return res.sendStatus(404)
      res.sendFile(join(storefront, 'index.html'))
    })
  }

  return { app, close }
}

if (import.meta.main) {
  const storefront = fileURLToPath(new URL('../dist', import.meta.url))
  if (!existsSync(join(storefront, 'index.html'))) {
    throw new Error('Run npm run build before starting the server.')
  }

  const { app, close } = await createServer(process.env, storefront)
  const port = Number(process.env.PORT || 4173)
  const host = process.env.HOST ||
    (process.env.RENDER === 'true' ? '0.0.0.0' : '127.0.0.1')
  const server = app.listen(port, host, () => console.log('Delicious on port', port))

  server.once('error', async error => {
    console.error('Could not start the server:', error.code)
    await close()
    process.exitCode = 1
  })

  function stop() {
    server.close(() => close())
  }

  process.once('SIGINT', stop)
  process.once('SIGTERM', stop)
}

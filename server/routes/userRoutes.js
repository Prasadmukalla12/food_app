import express from 'express'
import { createUserController } from '../controller/userController.js'

export function createUserRoutes(users) {
  const router = express.Router()
  const { register, login } = createUserController(users)

  router.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
  router.use(express.json({ limit: '4kb' }))
  router.post('/register', register)
  router.post('/login', login)

  return router
}

import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/users/authenticate.controller'
import { profile } from '../controllers/users/profile.controller'
import { refresh } from '../controllers/users/refresh.controller'
import { register } from '../controllers/users/register.controller'
import { verifyJWT } from '../middlewares/verify-jwt.middleware'

export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

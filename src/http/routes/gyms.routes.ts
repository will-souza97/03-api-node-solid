import { FastifyInstance } from 'fastify'
import { nearby } from '../controllers/gyms/nearby.controller'
import { create } from '../controllers/gyms/create.controller'
import { search } from '../controllers/gyms/search.controller'
import { verifyJWT } from '../middlewares/verify-jwt.middleware'
import { verifyUserRole } from '../middlewares/verify-user-role.middleware'

export async function gymsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}

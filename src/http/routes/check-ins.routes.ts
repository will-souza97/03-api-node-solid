import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt.middleware'
import { create } from '../controllers/check-ins/create.controller'
import { validate } from '../controllers/check-ins/validate.controller'
import { metrics } from '../controllers/check-ins/mectrics.controller'
import { history } from '../controllers/check-ins/history.controller'
import { verifyUserRole } from '../middlewares/verify-user-role.middleware'

export async function checkInsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', create)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}

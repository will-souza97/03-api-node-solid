import { FastifyInstance } from 'fastify'
import { gymsRoutes } from './gyms.routes'
import { userRoutes } from './users.routes'
import { checkInsRoutes } from './check-ins.routes'

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.register(userRoutes)
  app.register(gymsRoutes)
  app.register(checkInsRoutes)
}

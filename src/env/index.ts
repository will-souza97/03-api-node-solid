import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const envOrError = envSchema.safeParse(process.env)

if (envOrError.success === false) {
  const message = 'Invalid environment variables'

  console.error(message, envOrError.error.format())
  throw new Error(message)
}

export const env = envOrError.data

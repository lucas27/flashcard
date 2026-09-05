import { defineConfig, env } from 'prisma/config'
import { Prisma } from '@prisma/client'
import 'dotenv/config'

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'tsx prisma/seed.ts',
    },
    datasource: {
        url: env('DATABASE_URL'),
    },
})


import { auth } from '@/server/auth'
import userRouter from '@/server/routes/user'
import { Hono } from 'hono'

const app = new Hono().basePath('/api')

app.on(['POST', 'GET'], '/auth/*', (c) => auth.handler(c.req.raw))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/user', userRouter)

export default app
export type AppType = typeof routes

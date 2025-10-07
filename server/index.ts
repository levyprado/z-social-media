import { auth } from '@/server/auth'
import postsRouter from '@/server/routes/posts'
import userRouter from '@/server/routes/user'
import { Hono } from 'hono'

declare module 'hono' {
  interface ContextVariableMap {
    user: typeof auth.$Infer.Session.user
  }
}

const app = new Hono().basePath('/api')

app.on(['POST', 'GET'], '/auth/*', (c) => auth.handler(c.req.raw))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/user', userRouter).route('/posts', postsRouter)

export default app
export type AppType = typeof routes

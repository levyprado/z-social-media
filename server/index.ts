import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { auth } from './auth'
import followsRouter from './routes/follows'
import likesRouter from './routes/likes'
import postsRouter from './routes/posts'
import userRouter from './routes/user'

declare module 'hono' {
  interface ContextVariableMap {
    user: typeof auth.$Infer.Session.user
  }
}

const app = new Hono().basePath('/api')

app.on(['POST', 'GET'], '/auth/*', (c) => auth.handler(c.req.raw))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route('/user', userRouter)
  .route('/posts', postsRouter)
  .route('/likes', likesRouter)
  .route('/follows', followsRouter)

app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type AppType = typeof routes

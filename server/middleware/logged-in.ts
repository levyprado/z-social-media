import type { ErrorResponse } from '@/shared/types'
import { createMiddleware } from 'hono/factory'
import { auth } from 'server/auth'

export const loggedIn = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) {
    return c.json<ErrorResponse>(
      {
        success: false,
        error: 'Unauthorized',
      },
      401,
    )
  }

  c.set('user', session.user)
  await next()
})

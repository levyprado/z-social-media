import {
  usernameParamSchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import db from 'server/db'
import { user as usersTable } from 'server/db/schema/auth'
import { flattenError } from 'zod'

const userRouter = new Hono().get(
  '/:username',
  validator('param', (value, c) => {
    const parsed = usernameParamSchema.safeParse(value)
    if (!parsed.success) {
      return c.json<ErrorResponse>(
        {
          success: false,
          error: 'Invalid username param',
          details: flattenError(parsed.error),
        },
        400,
      )
    }
    return parsed.data
  }),
  async (c) => {
    const { username } = c.req.valid('param')

    try {
      const [user] = await db
        .select({
          id: usersTable.id,
          name: usersTable.name,
          username: usersTable.username,
          image: usersTable.image,
          bio: usersTable.bio,
          website: usersTable.website,
          createdAt: usersTable.createdAt,
        })
        .from(usersTable)
        .where(eq(usersTable.username, username))

      if (!user) {
        return c.json<ErrorResponse>(
          { success: false, error: 'User not found' },
          404,
        )
      }

      return c.json<SuccessResponse<{ user: typeof user }>>({
        success: true,
        message: 'User successfully fetched',
        data: { user },
      })
    } catch (error) {
      console.error('Error fetching user:', error)
      return c.json<ErrorResponse>(
        {
          success: false,
          error: 'Internal server error',
          details: error instanceof Error ? error.message : null,
        },
        500,
      )
    }
  },
)

export default userRouter

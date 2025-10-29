import {
  usernameParamSchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { and, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import db from 'server/db'
import { user as usersTable } from 'server/db/schema/auth'
import { follows } from 'server/db/schema/follows'
import { loggedIn } from 'server/middleware/logged-in'
import { flattenError } from 'zod'

const userRouter = new Hono().use('*', loggedIn).get(
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
    const currentUser = c.get('user')

    try {
      const [user] = await db
        .select({
          id: usersTable.id,
          name: usersTable.name,
          username: usersTable.username,
          image: usersTable.image,
          bio: usersTable.bio,
          website: usersTable.website,
          isFollowed: sql<boolean>`${follows.followerId} is not null`.as(
            'isFollowed',
          ),
          followerCount: usersTable.followerCount,
          followingCount: usersTable.followingCount,
          createdAt: usersTable.createdAt,
        })
        .from(usersTable)
        .leftJoin(
          follows,
          and(
            eq(follows.followerId, currentUser.id),
            eq(follows.followingId, usersTable.id),
          ),
        )
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

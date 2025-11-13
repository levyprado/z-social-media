import db from '@/db'
import { user, user as usersTable } from '@/db/schema/auth'
import { follows } from '@/db/schema/follows'
import { userSelectFields } from '@/lib/post-helpers'
import { loggedIn } from '@/middleware/logged-in'
import { USERS_PER_PAGE } from '@/shared/constants'
import {
  paginationSchema,
  usernameParamSchema,
  userParamSchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { and, eq, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { flattenError } from 'zod'

const currentUserFollows = alias(follows, 'currentUserFollows')

const userRouter = new Hono()
  .use('*', loggedIn)
  .get(
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
            isFollowed: sql<boolean>`${follows.followerId} is not null`,
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
  .get(
    '/:userId/followers',
    validator('param', (value, c) => {
      const parsed = userParamSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Invalid userId param',
            details: flattenError(parsed.error),
          },
          400,
        )
      }
      return parsed.data
    }),
    validator('query', (value, c) => {
      const parsed = paginationSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>({
          success: false,
          error: 'Invalid query parameters',
          details: flattenError(parsed.error),
        })
      }
      return parsed.data
    }),
    async (c) => {
      const currentUser = c.get('user')
      const { userId } = c.req.valid('param')
      const { offset } = c.req.valid('query')

      try {
        const followers = await db
          .select({
            ...userSelectFields,
            isFollowed: sql<boolean>`${currentUserFollows.followerId} is not null`,
          })
          .from(follows)
          .leftJoin(user, eq(follows.followerId, user.id))
          .leftJoin(
            currentUserFollows,
            and(
              eq(currentUserFollows.followerId, currentUser.id),
              eq(currentUserFollows.followingId, user.id),
            ),
          )
          .where(eq(follows.followingId, userId))
          .limit(USERS_PER_PAGE)
          .offset(offset)

        return c.json<SuccessResponse<typeof followers>>({
          success: true,
          message: 'Followers fetched successfully',
          data: followers,
        })
      } catch (error) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Something went wrong',
            details: error instanceof Error ? error.message : null,
          },
          500,
        )
      }
    },
  )
  .get(
    '/:userId/following',
    validator('param', (value, c) => {
      const parsed = userParamSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Invalid userId param',
            details: flattenError(parsed.error),
          },
          400,
        )
      }
      return parsed.data
    }),
    validator('query', (value, c) => {
      const parsed = paginationSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>({
          success: false,
          error: 'Invalid query parameters',
          details: flattenError(parsed.error),
        })
      }
      return parsed.data
    }),
    async (c) => {
      const currentUser = c.get('user')
      const { userId } = c.req.valid('param')
      const { offset } = c.req.valid('query')

      try {
        const following = await db
          .select({
            ...userSelectFields,
            isFollowed: sql<boolean>`${currentUserFollows.followerId} is not null`,
          })
          .from(follows)
          .leftJoin(user, eq(follows.followingId, user.id))
          .leftJoin(
            currentUserFollows,
            and(
              eq(currentUserFollows.followerId, currentUser.id),
              eq(currentUserFollows.followingId, user.id),
            ),
          )
          .where(eq(follows.followerId, userId))
          .limit(USERS_PER_PAGE)
          .offset(offset)

        return c.json<SuccessResponse<typeof following>>({
          success: true,
          message: 'Following fetched successfully',
          data: following,
        })
      } catch (error) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Something went wrong',
            details: error instanceof Error ? error.message : null,
          },
          500,
        )
      }
    },
  )

export default userRouter

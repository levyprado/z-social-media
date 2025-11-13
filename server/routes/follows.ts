import db from '@/db'
import { user as usersTable } from '@/db/schema/auth'
import { follows } from '@/db/schema/follows'
import { loggedIn } from '@/middleware/logged-in'
import {
  userParamSchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { and, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { flattenError } from 'zod'

const followsRouter = new Hono().use('*', loggedIn).post(
  '/:userId',
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
  async (c) => {
    const currentUser = c.get('user')
    const { userId } = c.req.valid('param')

    try {
      // Check if user exists
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1)
      if (!user) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'User not found',
          },
          404,
        )
      }

      // Toggle follow in transaction
      const isNowFollowed = await db.transaction(async (tx) => {
        // Try to delete follow first
        const deletedFollow = await tx
          .delete(follows)
          .where(
            and(
              eq(follows.followerId, currentUser.id),
              eq(follows.followingId, userId),
            ),
          )
          .returning()

        // If deleted follow length is 0, no unfollow was done
        const wasNotFollowed = deletedFollow.length === 0

        // If wasNotFollowed, insert new follow and increase counts
        if (wasNotFollowed) {
          // Insert new follow
          await tx.insert(follows).values({
            followerId: currentUser.id,
            followingId: userId,
          })

          // Increment followerCount of followed user
          await tx
            .update(usersTable)
            .set({
              followerCount: sql`${usersTable.followerCount} + 1`,
            })
            .where(eq(usersTable.id, userId))
          // Increment followingCount of current user
          await tx
            .update(usersTable)
            .set({
              followingCount: sql`${usersTable.followingCount} + 1`,
            })
            .where(eq(usersTable.id, currentUser.id))
        } else {
          // Decrement followerCount of unfollowed user
          await tx
            .update(usersTable)
            .set({
              followerCount: sql`${usersTable.followerCount} - 1`,
            })
            .where(eq(usersTable.id, userId))
          // Decrement followingCount of current user
          await tx
            .update(usersTable)
            .set({
              followingCount: sql`${usersTable.followingCount} - 1`,
            })
            .where(eq(usersTable.id, currentUser.id))
        }

        return wasNotFollowed
      })

      const newFollowerCount = user.followerCount + (isNowFollowed ? 1 : -1)

      return c.json<SuccessResponse>({
        success: true,
        message: `User ${isNowFollowed ? 'followed' : 'unfollowed'} successfully`,
        data: {
          followed: isNowFollowed,
          followerCount: newFollowerCount,
        },
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

export default followsRouter

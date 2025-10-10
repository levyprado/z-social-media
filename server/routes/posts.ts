import {
  createPostSchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { desc, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import db from 'server/db'
import { user } from 'server/db/schema/auth'
import { posts } from 'server/db/schema/posts'
import { loggedIn } from 'server/middleware/logged-in'
import { flattenError } from 'zod'

const postsRouter = new Hono()
  .use('/*', loggedIn)
  .post(
    '/',
    validator('form', (value, c) => {
      const parsed = createPostSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>({
          success: false,
          error: 'Validation failed',
          details: flattenError(parsed.error),
        })
      }
      return parsed.data
    }),
    async (c) => {
      const user = c.get('user')
      const { content, parentPostId } = c.req.valid('form')
      const parentPostIdValue =
        !parentPostId || parentPostId === 'undefined'
          ? null
          : parseInt(parentPostId)

      try {
        const newPost = await db.insert(posts).values({
          content,
          userId: user.id,
          parentPostId: parentPostIdValue,
        })

        // Increase reply count
        if (parentPostIdValue) {
          await db
            .update(posts)
            .set({
              replyCount: sql`${posts.replyCount} + 1`,
            })
            .where(eq(posts.id, parentPostIdValue))
        }

        return c.json<SuccessResponse>({
          success: true,
          message: 'Post created successfully',
          data: newPost,
        })
      } catch (error) {
        return c.json<ErrorResponse>({
          success: false,
          error: 'Something went wrong',
          details: error instanceof Error ? error.message : null,
        })
      }
    },
  )
  .get('/', async (c) => {
    try {
      const feedPosts = await db
        .select({
          id: posts.id,
          content: posts.content,
          userId: posts.userId,
          parentPostId: posts.parentPostId,
          replyCount: posts.replyCount,
          createdAt: posts.createdAt,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            image: user.image,
            createdAt: user.createdAt,
          },
        })
        .from(posts)
        .leftJoin(user, eq(posts.userId, user.id))
        .orderBy(desc(posts.createdAt))

      return c.json<SuccessResponse>({
        success: true,
        message: 'Feed posts fetched successfully',
        data: feedPosts,
      })
    } catch (error) {
      return c.json<ErrorResponse>({
        success: false,
        error: 'Something went wrong',
        details: error instanceof Error ? error.message : null,
      })
    }
  })

export default postsRouter

import {
  createPostSchema,
  getRepliesQuerySchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { desc, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import db from 'server/db'
import { user } from 'server/db/schema/auth'
import { posts } from 'server/db/schema/posts'
import { MAX_PARENT_DEPTH } from 'server/lib/constants'
import { loggedIn } from 'server/middleware/logged-in'
import { flattenError } from 'zod'

const postsRouter = new Hono()
  .use('/*', loggedIn)
  .post(
    '/',
    validator('form', (value, c) => {
      const parsed = createPostSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Validation failed',
            details: flattenError(parsed.error),
          },
          500,
        )
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
      return c.json<ErrorResponse>(
        {
          success: false,
          error: 'Something went wrong',
          details: error instanceof Error ? error.message : null,
        },
        500,
      )
    }
  })
  .get('/:postId', async (c) => {
    const { postId } = c.req.param()
    const postIdValue = Number(postId)

    if (isNaN(postIdValue)) {
      return c.json<ErrorResponse>(
        {
          success: false,
          error: 'Invalid post ID',
        },
        400,
      )
    }

    try {
      const [post] = await db
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
        .where(eq(posts.id, postIdValue))
        .limit(1)

      if (!post) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Post not found',
          },
          404,
        )
      }

      const parentPosts = []
      let currentParentId = post.parentPostId
      let depth = 0

      while (currentParentId && depth < MAX_PARENT_DEPTH) {
        const [parentPost] = await db
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
          .where(eq(posts.id, currentParentId))
          .limit(1)

        if (!parentPost) break

        parentPosts.unshift(parentPost)
        currentParentId = parentPost.parentPostId
        depth++
      }

      return c.json<
        SuccessResponse<{ post: typeof post; parentPosts: typeof parentPosts }>
      >({
        success: true,
        message: 'Post fetched successfully',
        data: { post, parentPosts },
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
  })
  .get(
    '/:postId/replies',
    validator('query', (value, c) => {
      const parsed = getRepliesQuerySchema.safeParse(value)

      if (!parsed.success) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Invalid query parameters',
            details: flattenError(parsed.error),
          },
          400,
        )
      }

      return parsed.data
    }),
    async (c) => {
      const { postId } = c.req.param()
      const postIdValue = Number(postId)

      if (isNaN(postIdValue)) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Invalid post ID',
          },
          400,
        )
      }

      const { limit, offset } = c.req.valid('query')
      const limitNum = Number(limit)
      const offsetNum = Number(offset)

      try {
        const replies = await db
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
          .where(eq(posts.parentPostId, postIdValue))
          .orderBy(desc(posts.createdAt))
          .limit(limitNum)
          .offset(offsetNum)

        return c.json<SuccessResponse<typeof replies>>({
          success: true,
          message: 'Replies fetched successfully',
          data: replies,
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

export default postsRouter

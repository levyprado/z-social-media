import { POSTS_PER_PAGE } from '@/shared/constants'
import {
  createPostSchema,
  postParamSchema,
  postsPaginationSchema,
  userParamSchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { and, desc, eq, isNull, SQL, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import db from 'server/db'
import { user } from 'server/db/schema/auth'
import { parentPost, parentPostUser, posts } from 'server/db/schema/posts'
import { MAX_PARENT_DEPTH } from 'server/lib/constants'
import {
  parentPostSelectFields,
  parentPostUserSelectFields,
  postSelectFields,
  userSelectFields,
} from 'server/lib/post-helpers'
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
  .get(
    '/',
    validator('query', (value, c) => {
      const parsed = postsPaginationSchema.safeParse(value)
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
      const { offset } = c.req.valid('query')

      try {
        const feedPosts = await db
          .select({
            ...postSelectFields,
            user: userSelectFields,
            parentPost: {
              ...parentPostSelectFields,
              user: parentPostUserSelectFields as unknown as SQL<{
                id: string
                name: string
                username: string
                image: string | null
                createdAt: string
              } | null>,
            },
          })
          .from(posts)
          .leftJoin(user, eq(posts.userId, user.id))
          .leftJoin(parentPost, eq(posts.parentPostId, parentPost.id))
          .leftJoin(parentPostUser, eq(parentPost.userId, parentPostUser.id))
          .orderBy(desc(posts.createdAt))
          .limit(POSTS_PER_PAGE)
          .offset(offset)

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
    },
  )
  .get(
    '/:postId',
    validator('param', (value, c) => {
      const parsed = postParamSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Invalid postId param',
            details: flattenError(parsed.error),
          },
          400,
        )
      }
      return parsed.data
    }),
    async (c) => {
      const { postId } = c.req.valid('param')
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
            ...postSelectFields,
            user: userSelectFields,
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
              ...postSelectFields,
              user: userSelectFields,
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
          SuccessResponse<{
            post: typeof post
            parentPosts: typeof parentPosts
          }>
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
    },
  )
  .get(
    '/:postId/replies',
    validator('param', (value, c) => {
      const parsed = postParamSchema.safeParse(value)
      if (!parsed.success) {
        return c.json<ErrorResponse>(
          {
            success: false,
            error: 'Invalid postId param',
            details: flattenError(parsed.error),
          },
          400,
        )
      }
      return parsed.data
    }),
    validator('query', (value, c) => {
      const parsed = postsPaginationSchema.safeParse(value)

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
      const { postId } = c.req.valid('param')
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

      const { offset } = c.req.valid('query')

      try {
        const replies = await db
          .select({
            ...postSelectFields,
            user: userSelectFields,
          })
          .from(posts)
          .leftJoin(user, eq(posts.userId, user.id))
          .where(eq(posts.parentPostId, postIdValue))
          .orderBy(desc(posts.createdAt))
          .limit(POSTS_PER_PAGE)
          .offset(offset)

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
  .get(
    '/user/:userId',
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
      const parsed = postsPaginationSchema.safeParse(value)

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
      const { userId } = c.req.valid('param')
      const { offset } = c.req.valid('query')

      try {
        const userPosts = await db
          .select({
            ...postSelectFields,
            user: userSelectFields,
          })
          .from(posts)
          .leftJoin(user, eq(posts.userId, user.id))
          .where(and(eq(posts.userId, userId), isNull(posts.parentPostId)))
          .orderBy(desc(posts.createdAt))
          .limit(POSTS_PER_PAGE)
          .offset(offset)

        return c.json<SuccessResponse<typeof userPosts>>(
          {
            success: true,
            message: 'User posts fetched successfully',
            data: userPosts,
          },
          200,
        )
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
    '/user/:userId/with-replies',
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
      const parsed = postsPaginationSchema.safeParse(value)

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
      const { userId } = c.req.valid('param')
      const { offset } = c.req.valid('query')

      try {
        const userPostsWithReplies = await db
          .select({
            ...postSelectFields,
            user: userSelectFields,
            parentPost: {
              ...parentPostSelectFields,
              user: parentPostUserSelectFields as unknown as SQL<{
                id: string
                name: string
                username: string
                image: string | null
                createdAt: string
              } | null>,
            },
          })
          .from(posts)
          .leftJoin(user, eq(posts.userId, user.id))
          .leftJoin(parentPost, eq(posts.parentPostId, parentPost.id))
          .leftJoin(parentPostUser, eq(parentPost.userId, parentPostUser.id))
          .where(eq(posts.userId, userId))
          .orderBy(desc(posts.createdAt))
          .limit(POSTS_PER_PAGE)
          .offset(offset)

        return c.json<SuccessResponse<typeof userPostsWithReplies>>(
          {
            success: true,
            message: 'User posts with replies fetched successfully',
            data: userPostsWithReplies,
          },
          200,
        )
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

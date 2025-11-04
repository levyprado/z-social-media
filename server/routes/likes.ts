import { POSTS_PER_PAGE } from '@/shared/constants'
import {
  paginationSchema,
  postParamSchema,
  userParamSchema,
  type ErrorResponse,
  type SuccessResponse,
} from '@/shared/types'
import { and, desc, eq, SQL, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import db from 'server/db'
import { user } from 'server/db/schema/auth'
import { likes } from 'server/db/schema/likes'
import { parentPost, parentPostUser, posts } from 'server/db/schema/posts'
import {
  parentPostSelectFields,
  parentPostUserSelectFields,
  postSelectFields,
  userSelectFields,
} from 'server/lib/post-helpers'
import { loggedIn } from 'server/middleware/logged-in'
import { flattenError } from 'zod'

const likesRouter = new Hono()
  .use('*', loggedIn)
  .post(
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
          500,
        )
      }
      return parsed.data
    }),
    async (c) => {
      const { postId } = c.req.valid('param')
      const currentUser = c.get('user')

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
        // Check if post exists
        const [post] = await db
          .select()
          .from(posts)
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

        // Toggle like in transaction
        const isNowLiked = await db.transaction(async (tx) => {
          // Try to delete like first
          const deleted = await tx
            .delete(likes)
            .where(
              and(
                eq(likes.userId, currentUser.id),
                eq(likes.postId, postIdValue),
              ),
            )
            .returning()

          // If deleted returning length is 0, that means post was not liked
          const wasNotLiked = deleted.length === 0

          // If post was not liked, insert new like and increment likeCount
          if (wasNotLiked) {
            await tx.insert(likes).values({
              userId: currentUser.id,
              postId: postIdValue,
            })

            await tx
              .update(posts)
              .set({ likeCount: sql`${posts.likeCount} + 1` })
              .where(eq(posts.id, postIdValue))
          } else {
            // Decrement likeCount
            await tx
              .update(posts)
              .set({ likeCount: sql`${posts.likeCount} - 1` })
              .where(eq(posts.id, postIdValue))
          }

          return wasNotLiked
        })

        const newLikeCount = post.likeCount + (isNowLiked ? 1 : -1)

        return c.json<SuccessResponse>({
          success: true,
          message: `Post ${isNowLiked ? 'liked' : 'unliked'} successfully`,
          data: {
            liked: isNowLiked,
            likeCount: newLikeCount,
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
  .get(
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
    validator('query', (value, c) => {
      const parsed = paginationSchema.safeParse(value)
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
        const likedPosts = await db
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
          .from(likes)
          .leftJoin(posts, eq(posts.id, likes.postId))
          .leftJoin(user, eq(user.id, posts.userId))
          .leftJoin(parentPost, eq(posts.parentPostId, parentPost.id))
          .leftJoin(parentPostUser, eq(parentPost.userId, parentPostUser.id))
          .where(eq(likes.userId, userId))
          .orderBy(desc(likes.createdAt))
          .limit(POSTS_PER_PAGE)
          .offset(offset)

        return c.json<SuccessResponse<typeof likedPosts>>({
          success: true,
          message: 'Liked posts fetched successfully',
          data: likedPosts,
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

export default likesRouter

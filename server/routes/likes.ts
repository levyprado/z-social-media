import type { ErrorResponse, SuccessResponse } from '@/shared/types'
import { and, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import db from 'server/db'
import { likes } from 'server/db/schema/likes'
import { posts } from 'server/db/schema/posts'
import { loggedIn } from 'server/middleware/logged-in'

const likesRouter = new Hono()
  .use('*', loggedIn)
  .post('/:postId', async (c) => {
    const { postId } = c.req.param()
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
  })

export default likesRouter

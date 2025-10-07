import { client } from '@/lib/api'
import type { ErrorResponse, Post, SuccessResponse } from '@/shared/types'

export type GetFeedPostsResponse = SuccessResponse<Post[]> | ErrorResponse

export const getFeedPosts = async () => {
  const res = await client.posts.$get()

  const data = (await res.json()) as GetFeedPostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

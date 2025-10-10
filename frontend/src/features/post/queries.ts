import { client } from '@/lib/api'
import type {
  CreatePostInput,
  ErrorResponse,
  Post,
  SuccessResponse,
} from '@/shared/types'

export type GetFeedPostsResponse = SuccessResponse<Post[]> | ErrorResponse

export const getFeedPosts = async () => {
  const res = await client.posts.$get()

  const data = (await res.json()) as GetFeedPostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

export const createPost = async (input: CreatePostInput) => {
  const res = await client.posts.$post({
    form: input,
  })

  const data = await res.json()
  return data
}

type GetPostResponse = SuccessResponse<Post> | ErrorResponse

export const getPost = async (postId: string) => {
  const res = await client.posts[':postId'].$get({
    param: { postId },
  })

  const data = (await res.json()) as GetPostResponse
  return data
}

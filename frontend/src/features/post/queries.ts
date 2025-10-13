import { client } from '@/lib/api'
import type {
  CreatePostInput,
  ErrorResponse,
  Post,
  PostWithParents,
  SuccessResponse,
} from '@/shared/types'
import { queryOptions, useQuery } from '@tanstack/react-query'

export type GetFeedPostsResponse = SuccessResponse<Post[]> | ErrorResponse

export const getFeedPosts = async () => {
  const res = await client.posts.$get()

  const data = (await res.json()) as GetFeedPostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

export const feedPostsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => getFeedPosts(),
  staleTime: 1000 * 60, // 1 minute
})

export const createPost = async (input: CreatePostInput) => {
  const res = await client.posts.$post({
    form: input,
  })

  const data = await res.json()
  return data
}

type GetPostResponse = SuccessResponse<PostWithParents> | ErrorResponse

export const getPost = async (postId: string) => {
  const res = await client.posts[':postId'].$get({
    param: { postId },
  })

  const data = (await res.json()) as GetPostResponse
  return data
}

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

type GetRepliesResponse = SuccessResponse<Post[]> | ErrorResponse

export const getReplies = async (postId: string, limit = 20, offset = 0) => {
  const res = await client.posts[':postId'].replies.$get({
    param: { postId },
    query: { limit: limit.toString(), offset: offset.toString() },
  })

  const data = (await res.json()) as GetRepliesResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

export const repliesQueryOptions = (
  postId: string,
  limit: number = 20,
  offset: number = 0,
) =>
  queryOptions({
    queryKey: ['replies', postId, limit, offset],
    queryFn: () => getReplies(postId, limit, offset),
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useReplies = (
  postId: string,
  limit: number = 20,
  offset: number = 0,
) => useQuery(repliesQueryOptions(postId, limit, offset))

import { client } from '@/lib/api'
import { POSTS_PER_PAGE } from '@/shared/constants'
import type {
  CreatePostInput,
  ErrorResponse,
  Post,
  PostWithParents,
  SuccessResponse,
} from '@/shared/types'
import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'

export type GetFeedPostsResponse = SuccessResponse<Post[]> | ErrorResponse

export const getFeedPosts = async (offset = 0) => {
  const res = await client.posts.$get({
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as GetFeedPostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

export const feedPostsInfiniteQueryOptions = infiniteQueryOptions({
  queryKey: ['posts'],
  queryFn: async ({ pageParam }) => getFeedPosts(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (lastPage.length < POSTS_PER_PAGE) {
      return undefined
    }
    return lastPageParam + POSTS_PER_PAGE
  },
  staleTime: 1000 * 60, // 1 minute
})

export const useFeedPostsInfinite = () =>
  useInfiniteQuery(feedPostsInfiniteQueryOptions)

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

export const getReplies = async (postId: string, offset = 0) => {
  const res = await client.posts[':postId'].replies.$get({
    param: { postId },
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as GetRepliesResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

export const repliesQueryOptions = (postId: string, offset: number = 0) =>
  queryOptions({
    queryKey: ['replies', postId, offset],
    queryFn: () => getReplies(postId, offset),
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useReplies = (postId: string, offset: number = 0) =>
  useQuery(repliesQueryOptions(postId, offset))

import { client } from '@/lib/api'
import { POSTS_PER_PAGE } from '@/shared/constants'
import type {
  CreatePostInput,
  ErrorResponse,
  Post,
  PostWithParent,
  PostWithParents,
  SuccessResponse,
} from '@/shared/types'
import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query'

export type GetPostsResponse = SuccessResponse<PostWithParent[]> | ErrorResponse

export const getFeedPosts = async (offset = 0) => {
  const res = await client.posts.$get({
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as GetPostsResponse
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

export const useFeedPosts = () =>
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

export const repliesInfiniteQueryOptions = (postId: string) =>
  infiniteQueryOptions({
    queryKey: ['replies', postId],
    queryFn: ({ pageParam }) => getReplies(postId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) {
        return undefined
      }
      return lastPageParam + POSTS_PER_PAGE
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useReplies = (postId: string) =>
  useInfiniteQuery(repliesInfiniteQueryOptions(postId))

export const getUserPosts = async (userId: string, offset = 0) => {
  const res = await client.posts.user[':userId'].$get({
    param: { userId },
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as GetPostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

export const userPostsInfiniteQueryOptions = (userId: string) =>
  infiniteQueryOptions({
    queryKey: ['posts', userId],
    queryFn: ({ pageParam }) => getUserPosts(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) {
        return undefined
      }
      return lastPageParam + POSTS_PER_PAGE
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useUserPosts = (userId: string) =>
  useInfiniteQuery(userPostsInfiniteQueryOptions(userId))

export const getUserPostsWithReplies = async (userId: string, offset = 0) => {
  const res = await client.posts.user[':userId']['with-replies'].$get({
    param: { userId },
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as GetPostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

export const userPostsWithRepliesInfiniteQueryOptions = (userId: string) =>
  infiniteQueryOptions({
    queryKey: ['posts', userId, 'with-replies'],
    queryFn: ({ pageParam }) => getUserPostsWithReplies(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) {
        return undefined
      }
      return lastPageParam + POSTS_PER_PAGE
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useUserPostsWithReplies = (userId: string) =>
  useInfiniteQuery(userPostsWithRepliesInfiniteQueryOptions(userId))

import { POSTS_PER_PAGE } from '@/shared/constants'
import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  fetchFeedPosts,
  fetchPostById,
  fetchPostReplies,
  fetchUserLikedPosts,
  fetchUserPosts,
  fetchUserPostsWithReplies,
} from './api'

const postKeys = {
  all: ['posts'],
  feed: () => [...postKeys.all, 'feed'],
  detail: (postId: string) => [...postKeys.all, 'detail', postId],
  replies: (postId: string) => [...postKeys.all, 'replies', postId],
  byUser: (userId: string) => [...postKeys.all, 'user', userId],
  byUserWithReplies: (userId: string) => [
    ...postKeys.byUser(userId),
    'with-replies',
  ],
  byUserLiked: (userId: string) => [
    ...postKeys.byUserWithReplies(userId),
    'liked',
  ],
}

// Feed Query
export const feedPostsQueryOptions = infiniteQueryOptions({
  queryKey: postKeys.feed(),
  queryFn: async ({ pageParam }) => fetchFeedPosts(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (lastPage.length < POSTS_PER_PAGE) return undefined
    return lastPageParam + POSTS_PER_PAGE
  },
  staleTime: 1000 * 60, // 1 minute
})

export const useFeedPosts = () => {
  return useInfiniteQuery(feedPostsQueryOptions)
}

// Post Detail Query
export const postDetailQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: postKeys.detail(postId),
    queryFn: () => fetchPostById(postId),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })

export const usePostDetail = (postId: string) => {
  return useSuspenseQuery(postDetailQueryOptions(postId))
}

// Post Replies
export const postRepliesQueryOptions = (postId: string) =>
  infiniteQueryOptions({
    queryKey: postKeys.replies(postId),
    queryFn: ({ pageParam }) => fetchPostReplies(postId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined
      return lastPageParam + POSTS_PER_PAGE
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const usePostReplies = (postId: string) => {
  return useInfiniteQuery(postRepliesQueryOptions(postId))
}

// User Posts Query
export const userPostsQueryOptions = (userId: string) =>
  infiniteQueryOptions({
    queryKey: postKeys.byUser(userId),
    queryFn: ({ pageParam }) => fetchUserPosts(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined
      return lastPageParam + POSTS_PER_PAGE
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useUserPosts = (userId: string) => {
  return useInfiniteQuery(userPostsQueryOptions(userId))
}

// User Posts with Replies
export const userPostsWithRepliesQueryOptions = (userId: string) =>
  infiniteQueryOptions({
    queryKey: postKeys.byUserWithReplies(userId),
    queryFn: ({ pageParam }) => fetchUserPostsWithReplies(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined
      return lastPageParam + POSTS_PER_PAGE
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useUserPostsWithReplies = (userId: string) => {
  return useInfiniteQuery(userPostsWithRepliesQueryOptions(userId))
}

// User liked posts
export const userLikedPostsQueryOptions = (userId: string) =>
  infiniteQueryOptions({
    queryKey: postKeys.byUserLiked(userId),
    queryFn: ({ pageParam }) => fetchUserLikedPosts(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined
      return lastPageParam + POSTS_PER_PAGE
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

export const useUserLikedPosts = (userId: string) => {
  return useInfiniteQuery(userLikedPostsQueryOptions(userId))
}

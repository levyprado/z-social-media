import { USERS_PER_PAGE } from '@/shared/constants'
import {
  infiniteQueryOptions,
  queryOptions,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  fetchUserByUsername,
  fetchUserFollowers,
  fetchUserFollowing,
} from './api'

export const userKeys = {
  all: ['users'],
  byUsername: (username: string) => [...userKeys.all, username],
  followers: (userId: string) => [...userKeys.all, 'followers', userId],
  following: (userId: string) => [...userKeys.all, 'following', userId],
}

export const userByUsernameQueryOptions = (username: string) =>
  queryOptions({
    queryKey: userKeys.byUsername(username),
    queryFn: () => fetchUserByUsername(username),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

export const useUserByUsername = (username: string) => {
  return useSuspenseQuery(userByUsernameQueryOptions(username))
}

export const userFollowersQueryOptions = (userId: string) =>
  infiniteQueryOptions({
    queryKey: userKeys.followers(userId),
    queryFn: ({ pageParam }) => fetchUserFollowers(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < USERS_PER_PAGE) return undefined
      return lastPageParam + USERS_PER_PAGE
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const useUserFollowers = (userId: string) => {
  return useSuspenseInfiniteQuery(userFollowersQueryOptions(userId))
}

export const userFollowingQueryOptions = (userId: string) =>
  infiniteQueryOptions({
    queryKey: userKeys.following(userId),
    queryFn: ({ pageParam }) => fetchUserFollowing(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < USERS_PER_PAGE) return undefined
      return lastPageParam + USERS_PER_PAGE
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const useUserFollowing = (userId: string) => {
  return useSuspenseInfiniteQuery(userFollowingQueryOptions(userId))
}

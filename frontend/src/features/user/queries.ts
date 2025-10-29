import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
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
  queryOptions({
    queryKey: userKeys.followers(userId),
    queryFn: () => fetchUserFollowers(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const useUserFollowers = (userId: string) => {
  return useSuspenseQuery(userFollowersQueryOptions(userId))
}

export const userFollowingQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: userKeys.following(userId),
    queryFn: () => fetchUserFollowing(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

export const useUserFollowing = (userId: string) => {
  return useSuspenseQuery(userFollowingQueryOptions(userId))
}

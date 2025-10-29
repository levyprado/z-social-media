import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchUserByUsername } from './api'

export const userKeys = {
  all: ['users'],
  byUsername: (username: string) => [...userKeys.all, username],
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

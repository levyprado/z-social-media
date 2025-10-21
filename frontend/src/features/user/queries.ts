import { client } from '@/lib/api'
import type {
  ErrorResponse,
  SuccessResponse,
  UserProfile,
} from '@/shared/types'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'

export type UserProfileResponse =
  | SuccessResponse<{ user: UserProfile }>
  | ErrorResponse

const userKeys = {
  all: ['users'],
  byUsername: (username: string) => [...userKeys.all, username],
}

export const fetchUserByUsername = async (username: string) => {
  const res = await client.user[':username'].$get({
    param: { username },
  })

  const data = (await res.json()) as UserProfileResponse
  if (!data.success) {
    throw notFound()
  }

  return data.data.user
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

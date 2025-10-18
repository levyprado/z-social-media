import { client } from '@/lib/api'
import type {
  ErrorResponse,
  SuccessResponse,
  UserProfile,
} from '@/shared/types'
import { queryOptions } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'

export const userByUsernameQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ['users', username],
    queryFn: () => getUserByUsername(username),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

export type GetUserResponse =
  | SuccessResponse<{ user: UserProfile }>
  | ErrorResponse

export const getUserByUsername = async (username: string) => {
  const res = await client.user[':username'].$get({
    param: { username },
  })
  const data = (await res.json()) as GetUserResponse
  if (!data.success) {
    throw notFound()
  }
  return data.data.user
}

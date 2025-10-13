import { client } from '@/lib/api'
import type {
  ErrorResponse,
  SuccessResponse,
  UserProfile,
} from '@/shared/types'
import { queryOptions } from '@tanstack/react-query'

export const userProfileQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ['user', username],
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

  return (await res.json()) as GetUserResponse
}

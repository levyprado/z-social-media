import { client } from '@/lib/api'
import type {
  ErrorResponse,
  SuccessResponse,
  UserProfile,
} from '@/shared/types'

export type GetUserResponse =
  | SuccessResponse<{ user: UserProfile }>
  | ErrorResponse

export const getUserByUsername = async (username: string) => {
  const res = await client.user[':username'].$get({
    param: { username },
  })

  return (await res.json()) as GetUserResponse
}

import { client } from '@/lib/api'
import type {
  ErrorResponse,
  SuccessResponse,
  UserProfile,
} from '@/shared/types'
import { notFound } from '@tanstack/react-router'

type UserProfileResponse =
  | SuccessResponse<{ user: UserProfile }>
  | ErrorResponse
type ToggleFollowResponse =
  | SuccessResponse<{ followed: boolean; followerCount: number }>
  | ErrorResponse

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

export const toggleFollow = async (userId: string) => {
  const res = await client.follows[':userId'].$post({
    param: { userId },
  })

  const data = (await res.json()) as ToggleFollowResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

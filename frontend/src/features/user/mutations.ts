import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postKeys } from '../post/queries'
import { toggleFollow } from './api'
import { userKeys } from './queries'

export const useToggleFollow = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleFollow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.invalidateQueries({ queryKey: postKeys.feedFollowing() })
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleLike } from './api'
import { postKeys } from './queries'

export const useToggleLike = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}

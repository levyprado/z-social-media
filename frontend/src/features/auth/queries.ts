import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { authClient } from './auth-client'

const authKeys = {
  currentUser: ['auth', 'user'],
}

export const fetchCurrentUser = async () => {
  const { data: session } = await authClient.getSession()

  return session?.user || null
}

export const currentUserQueryOptions = queryOptions({
  queryKey: authKeys.currentUser,
  queryFn: fetchCurrentUser,
  staleTime: 1000 * 60 * 5, // 5 minutes
})

export const useCurrentUser = () => {
  return useSuspenseQuery(currentUserQueryOptions)
}

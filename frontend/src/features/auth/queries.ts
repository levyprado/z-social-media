import { queryOptions } from '@tanstack/react-query'
import { authClient } from './auth-client'

export const userQueryOptions = queryOptions({
  queryKey: ['user'],
  queryFn: () => getUser(),
  staleTime: 1000 * 60 * 2,
})

export const getUser = async () => {
  const { data: session } = await authClient.getSession()

  return session?.user || null
}

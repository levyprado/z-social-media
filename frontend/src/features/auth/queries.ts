import { authClient } from './auth-client'

export const getUser = async () => {
  const { data: session } = await authClient.getSession()

  return session?.user || null
}

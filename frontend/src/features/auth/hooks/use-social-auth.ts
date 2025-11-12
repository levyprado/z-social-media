import { useState } from 'react'
import { authClient } from '../auth-client'

type Provider = 'github'

export default function useSocialAuth(provider: Provider) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const signIn = async () => {
    setIsLoading(true)
    setErrorMessage(null)
    await authClient.signIn.social({
      provider,
      callbackURL: window.location.origin,
      fetchOptions: {
        onError: (ctx) => {
          setIsLoading(false)
          setErrorMessage(ctx.error.message || 'An unexpected error occurred')
        },
      },
    })
  }

  return { signIn, isLoading, errorMessage }
}

import { ThemeProvider } from '@/components/theme-provider'
import type { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { User } from 'better-auth'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user: User | null
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </>
  )
}

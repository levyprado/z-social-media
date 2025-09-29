import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { User } from 'better-auth'

export const Route = createRootRouteWithContext<{
  user: User | null
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}

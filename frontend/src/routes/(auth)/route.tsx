import { getUser } from '@/features/auth/queries'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: async () => {
    const user = await getUser()

    if (user) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='grid min-h-dvh place-items-center px-4'>
      <Outlet />
    </div>
  )
}

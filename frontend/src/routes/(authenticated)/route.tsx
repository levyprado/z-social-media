import Sidebar from '@/components/sidebar/sidebar'
import { getUser } from '@/features/auth/queries'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)')({
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) {
      throw redirect({ to: '/login' })
    }
    return { user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex min-h-dvh justify-center'>
      <Sidebar />
      <div className='min-w-0 max-w-[600px] grow'>
        <Outlet />
      </div>
    </div>
  )
}

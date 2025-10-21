import Sidebar from '@/components/sidebar/sidebar'
import { currentUserQueryOptions } from '@/features/auth/queries'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const user = await queryClient.ensureQueryData(currentUserQueryOptions)

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
      <main className='min-w-0 max-w-[600px] grow'>
        <Outlet />
      </main>
    </div>
  )
}

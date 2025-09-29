import Sidebar from '@/components/sidebar/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)')({
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

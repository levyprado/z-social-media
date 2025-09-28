import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-dvh px-4 grid place-items-center'>
      <Outlet />
    </div>
  )
}

import { getUserByUsername } from '@/features/user/queries'
import { createFileRoute, Link, notFound, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/$username')({
  loader: async ({ params: { username } }) => {
    const response = await getUserByUsername(username)

    if (!response.success) throw notFound()

    return { user: response.data.user }
  },
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
})

function RouteComponent() {
  return <Outlet />
}

function NotFoundComponent() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='mb-4 text-4xl font-bold'>User Not Found</h1>
      <p className='mb-8 text-gray-600'>
        The user you're looking for doesn't exist.
      </p>
      <Link
        to='/'
        className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
      >
        Go Home
      </Link>
    </div>
  )
}

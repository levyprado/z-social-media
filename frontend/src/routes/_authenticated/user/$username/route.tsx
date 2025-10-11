import PageHeader from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { getUserByUsername } from '@/features/user/queries'
import { createFileRoute, Link, notFound, Outlet } from '@tanstack/react-router'
import { LoaderIcon, User2Icon } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/user/$username')({
  loader: async ({ params: { username } }) => {
    const response = await getUserByUsername(username)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (!response.success) throw notFound()

    return { user: response.data.user }
  },
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
  pendingComponent: () => (
    <div className='mt-32 flex items-center justify-center'>
      <LoaderIcon className='text-primary size-8 animate-spin' />
    </div>
  ),
})

function RouteComponent() {
  return <Outlet />
}

function NotFoundComponent() {
  return (
    <>
      <PageHeader title='Profile' />

      <div className='mt-20 flex flex-col items-center justify-center gap-5 px-4'>
        <User2Icon className='text-muted-foreground size-14' />
        <h1 className='text-center text-3xl font-semibold'>
          This user doesn't exist
        </h1>
        <Button
          variant='secondary'
          className='size-fit'
          render={(props) => (
            <Link to='/' {...props}>
              Go back
            </Link>
          )}
        ></Button>
      </div>
    </>
  )
}

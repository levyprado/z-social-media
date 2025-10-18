import PageHeader from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { userByUsernameQueryOptions } from '@/features/user/queries'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { User2Icon } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/user/$username')({
  loader: async ({ context: { queryClient }, params: { username } }) => {
    await queryClient.ensureQueryData(userByUsernameQueryOptions(username))
  },
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
  pendingComponent: () => (
    <div className='mt-32 flex items-center justify-center'>
      <Spinner />
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

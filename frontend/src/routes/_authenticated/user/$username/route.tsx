import ProfileHeader from '@/components/profile/profile-header'
import { Button } from '@/components/ui/button'
import { getUserByUsername } from '@/features/user/queries'
import { createFileRoute, Link, notFound, Outlet } from '@tanstack/react-router'
import { User2Icon } from 'lucide-react'

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
    <>
      <ProfileHeader title='Profile' />

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

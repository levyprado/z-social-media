import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CalendarDaysIcon, ChevronLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/user/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      {/* Profile Header */}
      <div className='bg-background/85 shadow-xs dark:bg-background/65 sticky left-0 top-0 flex w-full items-center gap-4 px-4 py-2 backdrop-blur-md'>
        <IconButton icon={ChevronLeftIcon} size='lg' />
        <div className='flex flex-col gap-1.5'>
          {/* User name */}
          <span className='text-lg font-semibold leading-none'>Elon Musk</span>
          {/* User post count */}
          <span className='text-muted-foreground text-sm leading-none'>
            5 posts
          </span>
        </div>
      </div>

      <div>
        <div>
          {/* User banner */}
          <div className='aspect-[3/1] w-full'>
            <div className='bg-accent size-full object-cover'></div>
          </div>
          {/* User info */}
          <div className='px-4 py-3'>
            <div className='flex items-start justify-between'>
              <Avatar
                img={null}
                className='border-background -mt-[calc(12.5%+12px)] h-auto w-[25%] min-w-12 border-4'
              />
              <div>
                <Button variant='outline'>Edit profile</Button>
              </div>
            </div>
            {/* User name/username */}
            <div className='mt-2 flex flex-col'>
              {/* User name */}
              <span className='text-xl font-bold leading-tight'>Elon Musk</span>
              {/* User username */}
              <span className='text-muted-foreground leading-tight'>
                @elonmusk
              </span>
            </div>
            {/* User metadata */}
            <div className='text-muted-foreground flex flex-col py-4'>
              <div className='flex items-center gap-2'>
                <CalendarDaysIcon className='size-4' />
                <span className='text-sm'>Joined September 2025</span>
              </div>
            </div>
            {/* Followers/Following */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1 text-sm'>
                <span className='font-medium'>77</span>
                <span className='text-muted-foreground'>Following</span>
              </div>
              <div className='flex items-center gap-1 text-sm'>
                <span className='font-medium'>12</span>
                <span className='text-muted-foreground'>Followers</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>

        {/* Tabs */}
        <nav className='mt-3 border-b'>
          <div className='flex'>
            {['Posts', 'Replies', 'Likes'].map((label) => (
              <Link
                key={label}
                to='/'
                className='text-muted-foreground hover:bg-accent/80 grow px-4 py-2 text-center font-medium'
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <section className='min-h-[150vh]'></section>
      </div>
    </>
  )
}

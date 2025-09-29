import { useRouteContext } from '@tanstack/react-router'
import { EllipsisIcon } from 'lucide-react'
import Avatar from '../ui/avatar'

export default function UserAccountButton() {
  const { user } = useRouteContext({ from: '/(authenticated)' })

  return (
    <button className='hover:bg-accent/80 cursor-pointer rounded-full p-2 transition-[background-color] md:flex md:w-full md:gap-3 md:p-2.5'>
      <Avatar img={user.image} />
      <div className='hidden grow items-center justify-between md:flex md:min-w-0 md:gap-2'>
        <div className='flex min-w-0 flex-col items-start'>
          <span className='max-w-full truncate font-medium leading-tight'>
            {user.name}
          </span>
          <span className='text-muted-foreground max-w-full truncate text-sm leading-tight'>
            @{user.username}
          </span>
        </div>
        <div>
          <EllipsisIcon className='size-5' />
        </div>
      </div>
    </button>
  )
}

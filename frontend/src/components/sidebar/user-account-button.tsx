import Avatar from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/features/auth/auth-client'
import { authUserQueryOptions } from '@/features/auth/queries'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useRouteContext } from '@tanstack/react-router'
import {
  EllipsisIcon,
  ExternalLinkIcon,
  Loader2Icon,
  LogOutIcon,
  User2Icon,
} from 'lucide-react'
import { useState } from 'react'

export default function UserAccountButton() {
  const { user } = useRouteContext({ from: '/_authenticated' })
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          queryClient.setQueryData(authUserQueryOptions.queryKey, null)
          navigate({ to: '/login' })
        },
        onResponse: () => {
          setIsLoading(false)
        },
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <button
            className='hover:bg-hover data-[popup-open]:bg-hover focus-visible:bg-hover cursor-pointer rounded-full p-2 transition-[background-color] md:flex md:w-full md:gap-3 md:p-2.5'
            {...props}
          >
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
        )}
      ></DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={4}
        sideOffset={8}
        align='start'
        className='md:w-72'
      >
        <DropdownMenuItem
          render={(props) => (
            <Link
              to='/user/$username'
              params={{
                username: user.username!,
              }}
              {...props}
            >
              <User2Icon />
              Profile
              <DropdownMenuShortcut>
                <ExternalLinkIcon />
              </DropdownMenuShortcut>
            </Link>
          )}
        ></DropdownMenuItem>
        <DropdownMenuItem closeOnClick={false} onClick={signOut}>
          {isLoading ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <LogOutIcon />
          )}
          Log out of @{user.username}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

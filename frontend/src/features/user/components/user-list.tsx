import useInfiniteScroll from '@/features/post/hooks/use-infinite-scroll'
import type { UserProfile } from '@/shared/types'
import type {
  InfiniteData,
  UseSuspenseInfiniteQueryResult,
} from '@tanstack/react-query'
import UserListItem from './user-list-item'
import UserListSkeleton from './user-list-skeleton'

type UserListProps = {
  query: UseSuspenseInfiniteQueryResult<InfiniteData<UserProfile[]>>
}

export default function UserList({ query }: UserListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = query

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const users = data?.pages.flatMap((page) => page) ?? []

  return (
    <>
      {users.length === 0 && (
        <div className='flex items-center justify-center py-10'>
          <span className='text-muted-foreground'>
            Nothing to show here yet...
          </span>
        </div>
      )}

      <ul className='divide-border divide-y'>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </ul>

      {isError && (
        <div className='text-destructive p-4 text-center text-sm'>
          Error loading users: {error?.message}
        </div>
      )}

      {hasNextPage && (
        <div ref={observerRef} className='py-1'>
          {isFetchingNextPage && <UserListSkeleton />}
        </div>
      )}
    </>
  )
}

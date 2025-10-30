import type { UserProfile } from '@/shared/types'
import UserListItem from './user-list-item'

type UserListProps = {
  users: UserProfile[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <>
      <>
        {users.length === 0 && (
          <div className='flex items-center justify-center py-10'>
            <span className='text-muted-foreground'>
              Nothing to show here yet...
            </span>
          </div>
        )}
      </>

      <ul className='divide-border divide-y'>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </ul>
    </>
  )
}

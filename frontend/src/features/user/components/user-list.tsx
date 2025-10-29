import type { UserProfile } from '@/shared/types'
import UserListItem from './user-list-item'

type UserListProps = {
  users: UserProfile[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <ul className='divide-border divide-y'>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </ul>
  )
}

import { getProfileTabs } from '@/lib/constants'
import { Link, useParams } from '@tanstack/react-router'

export default function ProfileTabs() {
  const { username } = useParams({ from: '/_authenticated/user/$username' })

  const profileTabs = getProfileTabs(username)

  return (
    <div className='border-b'>
      <nav className='flex w-full gap-2 rounded-lg px-2 py-1.5'>
        {profileTabs.map((tab) => (
          <Link
            key={tab.label}
            to={tab.link}
            params={tab.params}
            className='text-muted-foreground hover:bg-hover grow rounded-md p-1.5 text-center transition-all'
            activeOptions={{ exact: true }}
            activeProps={{
              className: 'bg-hover text-primary font-semibold',
            }}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

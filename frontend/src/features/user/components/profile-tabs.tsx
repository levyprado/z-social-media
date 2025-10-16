import { Link, useParams } from '@tanstack/react-router'

export default function ProfileTabs() {
  const { username } = useParams({ from: '/_authenticated/user/$username' })
  const tabs = [
    {
      label: 'Posts',
      link: '/user/$username',
    },
    {
      label: 'Replies',
      link: '/user/$username/replies',
    },
    {
      label: 'Likes',
      link: '/user/$username/likes',
    },
  ]

  return (
    <div className='border-b'>
      <nav className='flex w-full gap-2 rounded-lg px-2 py-1.5'>
        {tabs.map((tab) => (
          <Link
            to={tab.link}
            params={{ username }}
            className='text-muted-foreground hover:bg-input grow rounded-md p-1.5 text-center transition-all'
            activeOptions={{ exact: true }}
            activeProps={{
              className: 'bg-input text-primary font-semibold',
            }}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

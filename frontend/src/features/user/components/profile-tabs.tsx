import { Link } from '@tanstack/react-router'

export default function ProfileTabs() {
  return (
    <nav className='bg-background/95 sticky top-14 z-10 mt-3 border-b backdrop-blur-sm'>
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
  )
}

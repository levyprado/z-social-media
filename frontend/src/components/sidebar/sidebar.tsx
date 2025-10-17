import { getNavbarItems } from '@/lib/constants'
import { Link, useRouteContext } from '@tanstack/react-router'
import ThemeToggle from '../theme-toggle'
import NavItem from './nav-item'
import UserAccountButton from './user-account-button'

export default function Sidebar() {
  const { user } = useRouteContext({ from: '/_authenticated' })

  const navbarItems = getNavbarItems(user.username!)

  return (
    <header className='bg-background sticky left-0 top-0 flex h-dvh flex-col items-center justify-between border-r px-1 py-3 md:w-[min(30%,275px)] md:items-start md:px-3'>
      <Link
        to='/'
        className='hover:bg-hover flex size-12 items-center justify-center rounded-full transition-[background-color]'
      >
        <span className='text-primary text-4xl font-black'>Z</span>
      </Link>

      <div>
        <nav className='flex flex-col md:w-full'>
          {navbarItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
        <ThemeToggle />
      </div>

      <UserAccountButton />
    </header>
  )
}

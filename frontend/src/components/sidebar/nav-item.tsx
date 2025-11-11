import type { NavItem } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

type NavItemProps = {
  item: NavItem
}

export default function NavItem({
  item: { icon: Icon, ...item },
}: NavItemProps) {
  return (
    <Link
      to={item.link}
      params={item.params}
      className='group py-2'
      activeProps={{
        className: 'font-semibold text-primary',
      }}
      activeOptions={{
        exact: true,
      }}
    >
      {({ isActive }) => (
        <div
          className={cn(
            'group-hover:bg-hover rounded-full p-3 transition-[background-color] ease-out group-hover:transition-none md:flex md:gap-5',
            isActive && 'bg-hover',
          )}
        >
          <Icon className='size-6 md:size-7' />
          <span className='hidden md:block md:truncate md:text-xl'>
            {item.label}
          </span>
        </div>
      )}
    </Link>
  )
}

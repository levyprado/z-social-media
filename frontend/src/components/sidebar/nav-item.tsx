import type { NavItem } from '@/lib/constants'
import { Link } from '@tanstack/react-router'

type NavItemProps = {
  item: NavItem
}

export default function NavItem({
  item: { icon: Icon, ...item },
}: NavItemProps) {
  return (
    <Link to={item.link} className='group py-2'>
      <div className='group-hover:bg-accent/80 rounded-full p-3 transition-[background-color] ease-out group-hover:transition-none md:flex md:gap-5'>
        <Icon className='size-6 md:size-7' />
        <span className='hidden md:block md:truncate md:text-xl'>
          {item.label}
        </span>
      </div>
    </Link>
  )
}

import type { LinkProps } from '@tanstack/react-router'
import {
  HeartIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  User2Icon,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  icon: LucideIcon
  label: string
  link: LinkProps['to']
}

export const navbarItems: NavItem[] = [
  {
    icon: HomeIcon,
    label: 'Home',
    link: '/',
  },
  {
    icon: SearchIcon,
    label: 'Explore',
    link: '/',
  },
  {
    icon: MailIcon,
    label: 'Messages',
    link: '/',
  },
  {
    icon: HeartIcon,
    label: 'Liked',
    link: '/',
  },
  {
    icon: User2Icon,
    label: 'Profile',
    link: '/',
  },
]

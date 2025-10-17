import type { LinkProps } from '@tanstack/react-router'
import {
  HeartIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  User2Icon,
  type LucideIcon,
} from 'lucide-react'

export const PAGE_HEADER_HEIGHT = 56

export type NavItem = {
  icon: LucideIcon
  label: string
  link: LinkProps['to']
  params?: LinkProps['params']
}

export const getNavbarItems = (username: string): NavItem[] => [
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
    link: '/user/$username',
    params: { username },
  },
]

export type ProfileTab = {
  label: string
  link: LinkProps['to']
  params: LinkProps['params']
}

export const getProfileTabs = (username: string): ProfileTab[] => [
  {
    label: 'Posts',
    link: '/user/$username',
    params: { username },
  },
  {
    label: 'Replies',
    link: '/user/$username/replies',
    params: { username },
  },
  {
    label: 'Likes',
    link: '/user/$username/likes',
    params: { username },
  },
]

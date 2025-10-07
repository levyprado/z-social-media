import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMonthYear(createdAt: string): string {
  const date = new Date(createdAt)
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  return `${month} ${year}`
}

export function formatPostDate(timestamp: string): string {
  const now = new Date()
  const postDate = new Date(timestamp)
  const secondsAgo = Math.round((now.getTime() - postDate.getTime()) / 1000)

  const minute = 60
  const hour = minute * 60
  const day = hour * 24

  // Within the last 24 hours: Show relative time (s, m, h)
  if (secondsAgo < day) {
    if (secondsAgo < minute) {
      return `${secondsAgo}s`
    }
    if (secondsAgo < hour) {
      return `${Math.floor(secondsAgo / minute)}m`
    }
    return `${Math.floor(secondsAgo / hour)}h`
  }

  // Older than 24 hours
  const month = postDate.toLocaleString('default', { month: 'short' })
  const dayOfMonth = postDate.getDate()

  // If it's from a previous year, include the year
  if (now.getFullYear() > postDate.getFullYear()) {
    return `${month} ${dayOfMonth}, ${postDate.getFullYear()}`
  }

  // Otherwise, just show month and day
  return `${month} ${dayOfMonth}`
}

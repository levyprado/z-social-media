import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMonthYear(createdAt: string): string {
  const date = new Date(createdAt)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatPostDate(createdAt: string): string {
  const now = new Date()
  const postDate = new Date(createdAt)
  const secondsAgo = Math.round((now.getTime() - postDate.getTime()) / 1000)

  const MINUTE = 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24

  // Within the last 24 hours: Show relative time (s, m, h)
  if (secondsAgo < DAY) {
    if (secondsAgo < MINUTE) {
      return `${secondsAgo}s`
    }
    if (secondsAgo < HOUR) {
      return `${Math.floor(secondsAgo / MINUTE)}m`
    }
    return `${Math.floor(secondsAgo / HOUR)}h`
  }

  // Older than 24 hours
  const isDifferentYear = now.getFullYear() !== postDate.getFullYear()

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: isDifferentYear ? 'numeric' : undefined,
  }).format(postDate)
}

export function formatPostDetailDate(createdAt: string): string {
  const date = new Date(createdAt)

  const timeStr = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)

  const dateStr = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

  return `${timeStr} · ${dateStr}`
}

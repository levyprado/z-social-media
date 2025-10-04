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

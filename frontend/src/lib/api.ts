import type { AppType } from '@/shared/types'
import { hc } from 'hono/client'

export const client = hc<AppType>('/').api

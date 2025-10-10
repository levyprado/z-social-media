import * as z from 'zod'
import type { AppType } from '../server'

export { type AppType }

export type SuccessResponse<TData = unknown> = {
  success: true
  message: string
} & (unknown extends TData ? { data?: TData } : { data: TData })

export type ErrorResponse = {
  success: false
  error: string
  details?: any
}

export type UserProfile = {
  id: string
  name: string
  username: string
  image: string | null
  createdAt: string
}

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(30, 'Name must be 30 characters or less'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be 30 characters or less')
      .regex(
        /^[a-zA-Z0-9_.]+$/,
        'Username can only contain letters, numbers, dots, and underscores',
      ),
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be 128 characters or less'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export type Post = {
  id: number
  content: string
  userId: string
  parentPostId: number | null
  replyCount: number
  createdAt: string
  user: UserProfile
}

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(280, 'Content must be 280 characters or less'),
  parentPostId: z.string().optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

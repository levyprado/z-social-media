import * as z from 'zod'
import type { AppType } from '../server'
import type { auth } from '../server/auth'

export { type AppType, type auth }

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
  bio: string | null
  website: string | null
  isFollowed: boolean
  followerCount: number
  followingCount: number
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
  isLiked: boolean
  replyCount: number
  likeCount: number
  createdAt: string
  user: UserProfile
}

export type PostWithParent = Post & {
  parentPost: Post | null
}

export type PostWithParents = {
  post: Post
  parentPosts: Post[]
}

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(280, 'Content must be 280 characters or less'),
  parentPostId: z.string().optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const postsPaginationSchema = z.object({
  offset: z.coerce.number().optional().default(0),
})

export const userParamSchema = z.object({
  userId: z.string().nonempty(),
})

export const postParamSchema = z.object({
  postId: z.string().nonempty(),
})

export const usernameParamSchema = z.object({
  username: z.string().nonempty(),
})

export const userEditSchema = SignupSchema.pick({ name: true }).extend({
  bio: z.string().max(150, 'Bio must be 150 characters or less'),
  website: z.union([
    z.literal(''),
    z.url('Invalid URL').max(50, 'URL must be 50 characters or less'),
  ]),
})

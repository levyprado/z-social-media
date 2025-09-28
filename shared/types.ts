import z from 'zod'

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

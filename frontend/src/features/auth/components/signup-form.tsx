import { Form } from '@/components/form/form'
import { FormField } from '@/components/form/form-field'
import { PasswordField } from '@/components/form/password-field'
import { Button } from '@/components/ui/button'
import { authUserQueryOptions } from '@/features/auth/queries'
import { SignupSchema } from '@/shared/types'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '../auth-client'
import useSocialAuth from '../hooks/use-social-auth'

export default function SignupForm() {
  const {
    signIn,
    isLoading,
    errorMessage: socialErrorMessage,
  } = useSocialAuth('github')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: SignupSchema,
    },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...data } = value

      await authClient.signUp.email(data, {
        onSuccess: () => {
          queryClient.removeQueries({
            queryKey: authUserQueryOptions.queryKey,
          })
          navigate({ to: '/' })
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message || 'An unexpected error occurred')
        },
      })
    },
  })

  return (
    <>
      <div className='flex flex-col gap-2'>
        <Button
          disabled={isLoading}
          onClick={signIn}
          size='lg'
          variant='outline'
          className='w-full'
        >
          {isLoading ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <>
              <svg
                className='fill-foreground'
                width={24}
                height={24}
                viewBox='0 0 1024 1024'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'
                  transform='scale(64)'
                />
              </svg>
              Sign up with GitHub
            </>
          )}
        </Button>
        {socialErrorMessage && (
          <span className='text-destructive text-sm font-medium'>
            {socialErrorMessage}
          </span>
        )}
      </div>

      {/* Separator */}
      <div className='flex items-center justify-center gap-2 py-6'>
        <div className='bg-border h-0.5 grow rounded-full' />
        <span className='text-muted-foreground text-sm font-medium uppercase'>
          Or continue with
        </span>
        <div className='bg-border h-0.5 grow rounded-full' />
      </div>

      <Form form={form}>
        <form.Field
          name='name'
          children={(field) => (
            <FormField
              field={field}
              label='Name'
              placeholder='Elon Musk'
              required
            />
          )}
        />
        <form.Field
          name='username'
          children={(field) => (
            <FormField
              field={field}
              label='Username'
              placeholder='elonmusk'
              required
            />
          )}
        />
        <form.Field
          name='email'
          children={(field) => (
            <FormField
              field={field}
              label='Email'
              type='email'
              placeholder='elon@mail.com'
              required
            />
          )}
        />
        <form.Field
          name='password'
          children={(field) => (
            <PasswordField field={field} label='Password' required />
          )}
        />
        <form.Field
          name='confirmPassword'
          children={(field) => (
            <PasswordField field={field} label='Confirm password' required />
          )}
        />

        <div className='flex flex-col gap-2'>
          {errorMessage && (
            <span className='text-destructive text-xs font-medium'>
              {errorMessage}
            </span>
          )}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type='submit' disabled={!canSubmit} size='lg'>
                {isSubmitting ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  'Sign Up'
                )}
              </Button>
            )}
          />
        </div>
      </Form>
    </>
  )
}

import { Form } from '@/components/form/form'
import { FormField } from '@/components/form/form-field'
import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { authClient } from '@/features/auth/auth-client'
import { authUserQueryOptions } from '@/features/auth/queries'
import { userPostsQueryOptions } from '@/features/post/queries'
import { userEditSchema } from '@/shared/types'
import { useForm } from '@tanstack/react-form'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { userByUsernameQueryOptions } from '../queries'
import UserBanner from './user-banner'

type ProfileFormProps = {
  onClose: () => void
}

export default function ProfileForm({ onClose }: ProfileFormProps) {
  const userQuery = useSuspenseQuery(authUserQueryOptions)
  const user = userQuery.data!
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: user.name,
      bio: user.bio || '',
      website: user.website || '',
    },
    validators: {
      onChange: userEditSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.updateUser(value, {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: userByUsernameQueryOptions(user.username!).queryKey,
            }),
            queryClient.invalidateQueries({
              queryKey: authUserQueryOptions.queryKey,
            }),
            queryClient.invalidateQueries({
              queryKey: userPostsQueryOptions(user.id).queryKey,
            }),
          ])
          onClose()
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message || 'An unexpected error occurred')
        },
      })
    },
  })

  return (
    <Form form={form}>
      <div>
        <UserBanner />
        <div className='px-4'>
          <Avatar
            img={user.image}
            className='outline-background -mt-[12.5%] h-auto w-[25%] min-w-12 outline-4'
          />
        </div>
      </div>
      <form.Field
        name='name'
        children={(field) => <FormField field={field} label='Name' />}
      />
      <form.Field
        name='bio'
        children={(field) => (
          <FormField
            field={field}
            as='textarea'
            label='Bio'
            placeholder="What you're up to?"
          />
        )}
      />
      <form.Field
        name='website'
        children={(field) => (
          <FormField
            field={field}
            label='Website'
            placeholder='https://website.com'
          />
        )}
      />

      <DialogFooter className='flex flex-col gap-2'>
        {errorMessage && (
          <span className='text-destructive text-sm font-medium'>
            {errorMessage}
          </span>
        )}

        <div className='grid grid-cols-2 gap-4'>
          <DialogClose
            type='button'
            render={(props) => (
              <Button variant='secondary' {...props}>
                Discard
              </Button>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type='submit' disabled={!canSubmit}>
                {isSubmitting ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  'Save'
                )}
              </Button>
            )}
          />
        </div>
      </DialogFooter>
    </Form>
  )
}

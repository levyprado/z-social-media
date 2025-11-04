import FieldError from '@/components/form/field-error'
import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { createPostSchema } from '@/shared/types'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useRouteContext } from '@tanstack/react-router'
import { ImageIcon, Loader2Icon } from 'lucide-react'
import { createPost } from '../api'
import {
  feedPostsQueryOptions,
  postDetailQueryOptions,
  postRepliesQueryOptions,
} from '../queries'

type CreatePostFormProps = {
  parentPostUsername?: string
  parentPostId?: string
  onSuccess?: () => void
  onAvatarClick?: () => void
  className?: string
}

export default function CreatePostForm({
  parentPostUsername,
  parentPostId,
  onSuccess = () => {},
  onAvatarClick,
  className,
}: CreatePostFormProps) {
  const { user } = useRouteContext({ from: '/_authenticated' })
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: {
      content: '',
    },
    validators: {
      onChange: createPostSchema.pick({ content: true }),
    },
    onSubmit: async ({ value, formApi }) => {
      const data = {
        ...value,
        parentPostId,
      }
      const res = await createPost(data)
      if (!res.success) {
        formApi.fieldInfo.content.instance?.setErrorMap({ onSubmit: res.error })
      }

      formApi.reset()
      if (parentPostId) {
        queryClient.invalidateQueries({
          queryKey: postRepliesQueryOptions(parentPostId).queryKey,
        })
        queryClient.invalidateQueries({
          queryKey: postDetailQueryOptions(parentPostId).queryKey,
        })
      }
      queryClient.invalidateQueries({
        queryKey: feedPostsQueryOptions.queryKey,
      })
      onSuccess()
    },
  })

  return (
    <div className={cn('flex flex-col gap-2.5 border-b p-3', className)}>
      {parentPostUsername && (
        <div className='text-muted-foreground mr-2 text-sm'>
          Replying to{' '}
          <Link
            to='/user/$username'
            params={{ username: parentPostUsername }}
            className='text-primary hover:underline'
          >
            @{parentPostUsername}
          </Link>
        </div>
      )}

      <div className='flex items-start gap-3'>
        <Link
          to='/user/$username'
          params={{
            username: user.username!,
          }}
          onClick={onAvatarClick}
          className='transition-[filter] hover:brightness-[.85]'
        >
          <Avatar img={user.image} />
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className='flex w-full min-w-0 flex-col gap-4'
        >
          <form.Field
            name='content'
            children={(field) => (
              <div className='flex flex-col gap-2'>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={
                    parentPostUsername
                      ? 'Post your reply...'
                      : 'What are you thinking...?'
                  }
                />
                <FieldError field={field} />
              </div>
            )}
          />
          <div className='flex items-center justify-between gap-4'>
            <div className='flex shrink-0 gap-2'>
              <IconButton icon={ImageIcon} />
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  disabled={!canSubmit}
                  type='submit'
                  className='px-6 font-semibold'
                >
                  {isSubmitting ? (
                    <Loader2Icon className='animate-spin' />
                  ) : (
                    'Post'
                  )}
                </Button>
              )}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

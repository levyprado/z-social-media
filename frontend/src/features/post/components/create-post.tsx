import FieldError from '@/components/form/field-error'
import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createPostSchema } from '@/shared/types'
import { useForm } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { ImageIcon, Loader2Icon } from 'lucide-react'
import { createPost } from '../queries'

export default function CreatePost() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      content: '',
    },
    validators: {
      onChange: createPostSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const res = await createPost(value)
      console.log(res)
      if (!res.success) {
        formApi.fieldInfo.content.instance?.setErrorMap({ onSubmit: res.error })
      }
      formApi.reset()
      router.invalidate()
    },
  })

  return (
    <div className='flex gap-3 border-b px-3 py-3'>
      <div>
        <Avatar img={null} />
      </div>

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
                placeholder='What are you thinking...?'
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
  )
}

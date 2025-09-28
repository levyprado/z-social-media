import { cn } from '@/lib/utils'
import type { AnyFormApi } from '@tanstack/react-form'

type FormProps = {
  form: AnyFormApi
  children: React.ReactNode
  className?: string
}

export function Form({ form, children, className }: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={cn('flex flex-col gap-6', className)}
    >
      {children}
    </form>
  )
}

import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'field-sizing-content border-input shadow-xs placeholder:text-muted-foreground hover:border-ring/70 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 bg-input flex min-h-16 w-full rounded-md border px-3 py-2 text-base outline-none transition-[color,box-shadow,border-color] focus-visible:shadow-md disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }

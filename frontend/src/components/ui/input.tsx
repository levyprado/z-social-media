import { Input as BaseInput } from '@base-ui-components/react/input'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<typeof BaseInput> {
  inputContainerClassName?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

function Input({
  inputContainerClassName,
  className,
  type,
  leadingIcon,
  trailingIcon,
  disabled,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        'group relative w-full data-[disabled]:pointer-events-none',
        inputContainerClassName,
      )}
      data-disabled={disabled}
      data-slot='input-container'
    >
      {leadingIcon && (
        <span
          data-slot='input-leading-icon'
          className="text-muted-foreground absolute left-3 top-1/2 shrink-0 -translate-y-1/2 [&_svg:not([class*='pointer-events-'])]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
        >
          {leadingIcon}
        </span>
      )}
      <input
        type={type}
        data-slot='input'
        className={cn(
          'placeholder:text-muted-foreground selection:bg-primary group-hover:border-ring/70 selection:text-primary-foreground bg-input shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow,border-color] disabled:pointer-events-none disabled:opacity-50 md:text-sm',
          'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-visible:shadow-md',
          'aria-invalid:ring-destructive/50 aria-invalid:border-destructive',
          leadingIcon && 'pl-10',
          trailingIcon && 'pr-10',
          className,
        )}
        disabled={disabled}
        {...props}
      />
      {trailingIcon && (
        <span
          data-slot='input-trailing-icon'
          className="text-muted-foreground absolute right-3 top-1/2 shrink-0 -translate-y-1/2 [&_svg:not([class*='pointer-events-'])]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
        >
          {trailingIcon}
        </span>
      )}
    </div>
  )
}

export { Input }

import { mergeProps } from '@base-ui-components/react'
import { useRender } from '@base-ui-components/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 outline-none shrink-0 cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.97] focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'shadow-md bg-primary text-primary-foreground relative isolate before:from-primary-foreground/20 after:from-primary-foreground/10 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:opacity-80 before:transition-opacity after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:to-transparent after:mix-blend-overlay hover:bg-primary-darker focus-visible:ring-green-700',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
        ghost:
          'text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-hover',
        outline:
          'border bg-transparent text-foreground shadow-xs hover:bg-hover hover:text-accent-foreground dark:border-accent',
        destructive:
          'bg-destructive shadow-xs hover:bg-destructive/80 dark:bg-destructive/80 text-destructive-foreground dark:hover:bg-destructive/60 dark:focus-visible:ring-destructive/40 focus-visible:ring-destructive/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 gap-15 px-3 has-[>svg]:px-2.5',
        md: 'h-9 px-4 py-2 has-[>svg]:px-3',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-lg': "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    useRender.ComponentProps<'button'> {}

function Button({
  className,
  variant,
  size,
  render = <button />,
  ...props
}: ButtonProps) {
  const defaultProps = {
    'data-slot': 'button',
    className: cn(buttonVariants({ variant, size, className })),
  } as const

  const element = useRender({
    render,
    props: mergeProps<'button'>(defaultProps, props),
  })

  return element
}

export { Button, buttonVariants }

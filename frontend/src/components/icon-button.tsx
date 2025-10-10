import { cn } from '@/lib/utils'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  count?: number
  icon: React.ComponentType<{ size?: number; className?: string }>
  size?: 'sm' | 'md' | 'lg'
}

export default function IconButton({
  count,
  icon: Icon,
  size = 'sm',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type='button'
      className={cn(
        'text-muted-foreground hover:text-primary disabled:text-muted focus-visible:text-primary group flex cursor-pointer items-center gap-1.5 pr-2.5 outline-0 transition-[color,scale] last:pr-0 active:scale-[0.97] disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <div className='relative'>
        <span
          className={cn(
            '-translate-1/2 group-hover:bg-primary/10 group-focus-visible:bg-primary/10 group-focus-visible:ring-primary-darker absolute left-1/2 top-1/2 rounded-full transition-[background-color,box-shadow] group-focus-visible:ring-[2px]',
            size === 'sm' && 'size-9',
            size === 'md' && 'size-10',
            size === 'lg' && 'size-10',
          )}
        ></span>
        <Icon
          className={cn(
            size === 'sm' && 'size-4',
            size === 'md' && 'size-5',
            size === 'lg' && 'size-6',
          )}
        />
      </div>
      {typeof count === 'number' && (
        <span className={cn('text-sm', count === 0 && 'invisible')}>
          {count}
        </span>
      )}
    </button>
  )
}

import { cn } from '@/lib/utils'

type AvatarProps = {
  img: string | null | undefined
  className?: string
}

export default function Avatar({ img, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'aspect-square size-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
    >
      {img ? (
        <img src={img} className='size-full object-cover' />
      ) : (
        <div className='bg-primary size-full' />
      )}
    </div>
  )
}

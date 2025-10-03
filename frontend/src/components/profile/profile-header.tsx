import IconButton from '@/components/icon-button'
import { ChevronLeftIcon } from 'lucide-react'

type ProfileHeaderProps = {
  title: string
  description: string
}

export default function ProfileHeader({
  title,
  description,
}: ProfileHeaderProps) {
  return (
    <div className='bg-background/85 shadow-xs dark:bg-background/65 sticky left-0 top-0 z-10 flex h-14 w-full items-center gap-4 px-4 backdrop-blur-md'>
      <IconButton icon={ChevronLeftIcon} size='lg' />
      <div className='flex flex-col'>
        <span className='text-xl font-bold leading-tight'>{title}</span>
        <span className='text-muted-foreground text-sm leading-tight'>
          {description}
        </span>
      </div>
    </div>
  )
}

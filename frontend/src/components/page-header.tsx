import IconButton from '@/components/icon-button'
import { PAGE_HEADER_HEIGHT } from '@/lib/constants'
import { useRouter } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

type PageHeaderProps = {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  const router = useRouter()

  const handleGoBack = () => {
    if (router.history.canGoBack()) {
      router.history.back()
    } else {
      router.navigate({ to: '/' })
    }
  }

  return (
    <div
      className='bg-background/85 dark:bg-background/65 sticky left-0 top-0 z-10 flex w-full items-center gap-4 px-4 backdrop-blur-md'
      style={{ height: PAGE_HEADER_HEIGHT }}
    >
      <IconButton onClick={handleGoBack} icon={ChevronLeftIcon} size='lg' />
      <div className='flex flex-col'>
        <span className='text-xl font-bold leading-tight'>{title}</span>
        {description && (
          <span className='text-muted-foreground text-sm leading-tight'>
            {description}
          </span>
        )}
      </div>
    </div>
  )
}

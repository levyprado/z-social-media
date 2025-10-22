import PageHeader from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import PostSkeleton from '@/features/post/components/post-skeleton'

export default function ProfileContentSkeleton() {
  return (
    <>
      <PageHeader title='Profile' />

      <Skeleton className='aspect-[3/1] w-full rounded-none' />

      <div className='px-4 pt-3'>
        <div className='flex items-start justify-between'>
          <Skeleton className='outline-background -mt-[calc(12.5%+12px)] aspect-square h-auto w-[25%] min-w-12 shrink-0 rounded-full outline-4' />

          <Skeleton className='h-9 w-28' />
        </div>

        <div className='mt-4 flex flex-col'>
          <div className='flex flex-col gap-1.5'>
            <Skeleton className='h-5 w-36' />
            <Skeleton className='h-4 w-24' />
          </div>

          <div className='mt-5 flex flex-col gap-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-1/3' />
          </div>

          <div className='mt-5 flex gap-2'>
            <Skeleton className='h-4 w-6' />
            <Skeleton className='h-4 w-36' />
          </div>

          <div className='mt-5 flex gap-3'>
            {[...Array(2).keys()].map((i) => (
              <div key={i} className='flex gap-1'>
                <Skeleton className='h-3.5 w-5' />
                <Skeleton className='h-3.5 w-16' />
              </div>
            ))}
          </div>

          <div className='mt-5 flex gap-2'>
            {[...Array(3).keys()].map((i) => (
              <Skeleton key={i} className='h-8 grow' />
            ))}
          </div>
        </div>
      </div>

      <div className='mt-1.5 border-t'>
        <PostSkeleton />
      </div>
    </>
  )
}

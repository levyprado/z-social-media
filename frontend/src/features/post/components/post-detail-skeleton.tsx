import { Skeleton } from '@/components/ui/skeleton'
import PostSkeleton from './post-skeleton'

export default function PostDetailSkeleton() {
  return (
    <>
      <div className='px-4 pt-3'>
        <div className='flex items-center gap-2'>
          <Skeleton className='size-10 rounded-full' />
          <div className='flex w-full items-baseline justify-between'>
            <div className='flex flex-col gap-1.5'>
              <Skeleton className='h-3.5 w-28' />
              <Skeleton className='h-3.5 w-16' />
            </div>
            <Skeleton className='h-3 w-6' />
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-3'>
          {[...Array(5).keys()].map((i) => (
            <Skeleton key={i} className='h-4 w-full' />
          ))}
          <Skeleton className='h-4 w-1/3' />
          <div className='flex items-center gap-2 py-4'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
        <div className='flex items-center justify-between border-y px-1 py-3'>
          {[...Array(4).keys()].map((i) => (
            <Skeleton key={i} className='size-7 rounded-full' />
          ))}
        </div>
      </div>

      <div className='divide-border flex flex-col divide-y'>
        <PostSkeleton />
      </div>
    </>
  )
}

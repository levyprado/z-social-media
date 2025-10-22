import { Skeleton } from '@/components/ui/skeleton'

type PostSkeletonProps = {
  count?: number
}

export default function PostSkeleton({ count = 6 }: PostSkeletonProps) {
  return (
    <>
      {[...Array(count).keys()].map((i) => (
        <div key={i} className='flex gap-2 px-4 py-3'>
          <Skeleton className='size-10 rounded-full' />
          <div className='flex w-full flex-col gap-4'>
            <div className='flex'>
              <div className='flex w-full flex-col gap-2 sm:flex-row sm:items-center'>
                <Skeleton className='h-4 w-36' />
                <div className='flex gap-3'>
                  <Skeleton className='h-3 w-20' />
                  <Skeleton className='h-3 w-6' />
                </div>
              </div>
              <Skeleton className='h-2.5 w-5' />
            </div>
            <div className='flex flex-col gap-3'>
              {[...Array(4).keys()].map((i) => (
                <Skeleton key={i} className='h-3 w-full' />
              ))}
              <Skeleton className='h-3 w-1/2' />
            </div>
            <div className='flex justify-between'>
              {[...Array(4).keys()].map((i) => (
                <Skeleton key={i} className='size-4' />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

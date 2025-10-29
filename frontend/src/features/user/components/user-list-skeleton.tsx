import { Skeleton } from '@/components/ui/skeleton'

export default function UserListSkeleton() {
  return (
    <div className='divide-border divide-y'>
      {[...Array(16).keys()].map((i) => (
        <div key={i} className='flex items-center gap-2 px-3 py-2'>
          <Skeleton className='size-10 rounded-full' />

          <div className='flex w-full items-center justify-between'>
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3 w-32' />
              <Skeleton className='h-3 w-16' />
            </div>

            <Skeleton className='h-9 w-20' />
          </div>
        </div>
      ))}
    </div>
  )
}

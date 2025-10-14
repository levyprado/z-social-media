import Post from '@/features/post/components/post'
import { LoaderIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useFeedPosts } from '../queries'

export default function PostList() {
  const observerRef = useRef<HTMLDivElement>(null)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useFeedPosts()

  useEffect(() => {
    if (!observerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? []

  return (
    <>
      <div className='divide-border flex flex-col divide-y'>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {isError && (
        <div className='text-destructive p-4 text-center text-sm'>
          Error loading posts: {error.message}
        </div>
      )}

      {hasNextPage && (
        <div ref={observerRef}>
          <div className='flex items-center justify-center py-12'>
            {isFetchingNextPage && (
              <LoaderIcon className='text-primary size-6 animate-spin' />
            )}
          </div>
        </div>
      )}
    </>
  )
}

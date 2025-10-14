import { Spinner } from '@/components/ui/spinner'
import Post from '@/features/post/components/post'
import useInfiniteScroll from '../hooks/use-infinite-scroll'
import { useFeedPosts } from '../queries'

export default function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useFeedPosts()

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

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
            {isFetchingNextPage && <Spinner />}
          </div>
        </div>
      )}
    </>
  )
}

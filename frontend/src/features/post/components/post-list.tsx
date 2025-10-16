import { Spinner } from '@/components/ui/spinner'
import Post from '@/features/post/components/post'
import type { Post as TPost } from '@/shared/types'
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import useInfiniteScroll from '../hooks/use-infinite-scroll'

type PostListProps = {
  query: UseInfiniteQueryResult<InfiniteData<TPost[]>>
}

export default function PostList({ query }: PostListProps) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = query

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const posts = data?.pages.flatMap((page) => page) ?? []

  if (isLoading) {
    return (
      <div className='mt-16 flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

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

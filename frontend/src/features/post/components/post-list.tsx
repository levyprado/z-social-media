import Post from '@/features/post/components/post'
import type { Post as TPost } from '@/shared/types'
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from '@tanstack/react-query'
import useInfiniteScroll from '../hooks/use-infinite-scroll'
import PostSkeleton from './post-skeleton'

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
    return <PostSkeleton />
  }

  return (
    <div className='divide-border flex flex-col divide-y'>
      {posts.length === 0 && !isError && (
        <div className='flex items-center justify-center py-10'>
          <span className='text-muted-foreground'>
            Nothing to show here yet...
          </span>
        </div>
      )}

      {isError && (
        <div className='text-destructive p-4 text-center text-sm'>
          Error loading posts: {error.message}
        </div>
      )}

      {hasNextPage && (
        <div ref={observerRef} className='py-1'>
          {isFetchingNextPage && <PostSkeleton count={1} />}
        </div>
      )}

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

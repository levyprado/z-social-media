import Avatar from '@/components/ui/avatar'
import { PAGE_HEADER_HEIGHT } from '@/lib/constants'
import { formatPostDetailDate } from '@/lib/utils'
import { Link, useParams } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import useInfiniteScroll from '../hooks/use-infinite-scroll'
import { usePostDetail, usePostReplies } from '../queries'
import CreatePost from './create-post'
import Post from './post'
import { PostMetrics } from './post-metrics'
import PostSkeleton from './post-skeleton'

export default function PostDetail() {
  const { postId } = useParams({ from: '/_authenticated/post/$postId' })
  const { data: postData } = usePostDetail(postId)
  const { post, parentPosts } = postData
  const postRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (parentPosts.length > 0 && postRef.current) {
      const elementPosition = postRef.current.getBoundingClientRect().top
      const offsetPosition =
        elementPosition + window.scrollY - PAGE_HEADER_HEIGHT

      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto',
      })
    }
  }, [parentPosts.length])

  const {
    data: repliesData,
    isLoading: isLoadingReplies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError: repliesError,
    error,
  } = usePostReplies(postId)

  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })

  const replies = repliesData?.pages.flatMap((page) => page) ?? []

  return (
    <section>
      {parentPosts.map((parentPost) => (
        <Post key={parentPost.id} post={parentPost} isParentPost />
      ))}

      <article ref={postRef} className='px-4 pt-3'>
        {/* Header */}
        <div className='flex items-center gap-2'>
          <Link
            to='/user/$username'
            params={{ username: post.user.username }}
            className='transition-[filter] hover:brightness-[.85]'
          >
            <Avatar img={post.user.image} />
          </Link>
          <div className='flex w-full min-w-0'>
            <Link
              to='/user/$username'
              params={{ username: post.user.username }}
              className='flex min-w-0 flex-col'
            >
              <span className='mr-2 truncate font-bold leading-tight hover:underline'>
                {post.user.name}
              </span>
              <span className='text-muted-foreground truncate leading-tight hover:underline'>
                @{post.user.username}
              </span>
            </Link>
          </div>
        </div>
        {/* Content */}
        <div>
          <p className='whitespace-pre-wrap pt-3'>{post.content}</p>
          <div className='py-4'>
            <time dateTime={post.createdAt} className='text-muted-foreground'>
              {formatPostDetailDate(post.createdAt)}
            </time>
          </div>
        </div>
        {/* Metrics */}
        <div className='border-y px-1 py-3'>
          <PostMetrics
            post={post}
            isDetail
            replyCount={post.replyCount}
            repostCount={0}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
          />
        </div>
      </article>

      <CreatePost
        parentPostUsername={post.user.username}
        parentPostId={String(post.id)}
      />

      {repliesError && (
        <div className='text-destructive p-4 text-center text-sm'>
          Error loading replies: {error.message}
        </div>
      )}

      {/* Replies */}
      <div className='divide-border flex flex-col divide-y'>
        {isLoadingReplies && <PostSkeleton />}

        {replies.map((reply) => (
          <Post key={reply.id} post={reply} />
        ))}

        {hasNextPage && (
          <div ref={observerRef}>
            {isFetchingNextPage && <PostSkeleton count={1} />}
          </div>
        )}
      </div>
    </section>
  )
}

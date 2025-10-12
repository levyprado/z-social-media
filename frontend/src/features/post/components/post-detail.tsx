import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { PAGE_HEADER_HEIGHT } from '@/lib/constants'
import { formatPostDetailDate } from '@/lib/utils'
import { Link, useLoaderData, useParams } from '@tanstack/react-router'
import { EllipsisIcon, LoaderIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useReplies } from '../queries'
import CreatePost from './create-post'
import Post from './post'
import { PostMetrics } from './post-metrics'

export default function PostDetail() {
  const { postId } = useParams({ from: '/_authenticated/post/$postId' })
  const { post, parentPosts } = useLoaderData({
    from: '/_authenticated/post/$postId',
  })
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
    data: replies,
    isLoading: isLoadingReplies,
    error: repliesError,
  } = useReplies(postId)

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
          <div className='flex w-full min-w-0 items-baseline justify-between'>
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

            <IconButton size='md' icon={EllipsisIcon} />
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
            isDetail
            replyCount={post.replyCount}
            repostCount={0}
            likeCount={0}
          />
        </div>
      </article>

      <CreatePost
        parentPostUsername={post.user.username}
        parentPostId={String(post.id)}
      />

      {/* Replies */}
      <div className='divide-border flex flex-col divide-y'>
        {isLoadingReplies && (
          <div className='flex items-center justify-center py-10'>
            <LoaderIcon className='text-primary size-6 animate-spin' />
          </div>
        )}

        {!isLoadingReplies &&
          !repliesError &&
          replies &&
          replies.length > 0 && (
            <>
              {replies?.map((reply) => (
                <Post key={reply.id} post={reply} />
              ))}
            </>
          )}
      </div>
    </section>
  )
}

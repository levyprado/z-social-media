import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { PAGE_HEADER_HEIGHT } from '@/lib/constants'
import { Link, useLoaderData } from '@tanstack/react-router'
import { EllipsisIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import CreatePost from './create-post'
import Post from './post'
import { PostMetrics } from './post-metrics'

export default function PostDetail() {
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
            <time dateTime='1' className='text-muted-foreground'>
              9:20 AM · Oct 9, 2025
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
      <div className='divide-border flex flex-col divide-y'></div>
    </section>
  )
}

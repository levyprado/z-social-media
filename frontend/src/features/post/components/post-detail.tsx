import IconButton from '@/components/icon-button'
import Avatar from '@/components/ui/avatar'
import { useParams } from '@tanstack/react-router'
import { EllipsisIcon } from 'lucide-react'
import CreatePost from './create-post'
import { PostMetrics } from './post-metrics'

export default function PostDetail() {
  const { postId } = useParams({ from: '/_authenticated/post/$postId' })

  return (
    <section>
      <div>
        <article className='px-4 pt-3'>
          {/* Header */}
          <div className='flex items-center gap-2'>
            <Avatar img={null} />
            <div className='flex w-full min-w-0 items-baseline justify-between'>
              <div className='flex min-w-0 flex-col'>
                <span className='mr-2 truncate font-bold leading-tight'>
                  Elon Musk
                </span>
                <span className='text-muted-foreground truncate leading-tight'>
                  @elonmusk
                </span>
              </div>

              <IconButton size='md' icon={EllipsisIcon} />
            </div>
          </div>
          {/* Content */}
          <div>
            <p className='pt-3'>
              I was surprised by how many students liked the .mdc file in the
              course (works great with tools like Cursor).
              <br />
              <br />
              Each lesson now also has a markdown version.
              <br />
              <br />
              Feed it to an LLM, ask about something you’ve already read or
              request clarification.
            </p>
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
              replyCount={0}
              repostCount={0}
              likeCount={0}
            />
          </div>
        </article>

        {/* Create reply */}
        <div>
          <CreatePost isReply parentPostId={postId} />
        </div>
      </div>

      {/* Replies */}
      <div className='divide-border flex flex-col divide-y'></div>
    </section>
  )
}

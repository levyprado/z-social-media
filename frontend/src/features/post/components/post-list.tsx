import Post from '@/features/post/components/post'
import { useLoaderData } from '@tanstack/react-router'

export default function PostList() {
  const { posts } = useLoaderData({ from: '/_authenticated/' })

  return (
    <div className='divide-border flex flex-col divide-y'>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

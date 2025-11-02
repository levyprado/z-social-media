import { client } from '@/lib/api'
import type {
  CreatePostInput,
  ErrorResponse,
  Post,
  PostWithParent,
  PostWithParents,
  SuccessResponse,
} from '@/shared/types'
import { notFound } from '@tanstack/react-router'

type PostsResponse = SuccessResponse<Post[]> | ErrorResponse
type PostsWithParentResponse = SuccessResponse<PostWithParent[]> | ErrorResponse
type PostDetailResponse = SuccessResponse<PostWithParents> | ErrorResponse
type ToggleLikeResponse =
  | SuccessResponse<{ liked: boolean; likeCount: number }>
  | ErrorResponse

// Create post
export const createPost = async (input: CreatePostInput) => {
  const res = await client.posts.$post({
    form: input,
  })

  const data = await res.json()
  return data
}

// Feed posts
export const fetchFeedPosts = async (offset = 0) => {
  const res = await client.posts.$get({
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as PostsWithParentResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

// Single post
export const fetchPostById = async (postId: string) => {
  const res = await client.posts[':postId'].$get({
    param: { postId },
  })

  const data = (await res.json()) as PostDetailResponse

  if (!data.success) {
    if (data.error === 'Invalid post ID' || data.error === 'Post not found') {
      throw notFound()
    }
    throw new Error(data.error)
  }

  return data.data
}

// Post replies
export const fetchPostReplies = async (postId: string, offset = 0) => {
  const res = await client.posts[':postId'].replies.$get({
    param: { postId },
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as PostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

// User posts (top-level only)
export const fetchUserPosts = async (userId: string, offset = 0) => {
  const res = await client.posts.user[':userId'].$get({
    param: { userId },
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as PostsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

// User posts (include replies)
export const fetchUserPostsWithReplies = async (userId: string, offset = 0) => {
  const res = await client.posts.user[':userId']['with-replies'].$get({
    param: { userId },
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as PostsWithParentResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

// User liked posts (include replies)
export const fetchUserLikedPosts = async (userId: string, offset = 0) => {
  const res = await client.likes[':userId'].$get({
    param: { userId },
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as PostsWithParentResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

// Toggle like
export const toggleLike = async (postId: number) => {
  const res = await client.likes[':postId'].$post({
    param: { postId: postId.toString() },
  })

  const data = (await res.json()) as ToggleLikeResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

// User following feed posts
export const fetchFollowingFeedPosts = async (offset = 0) => {
  const res = await client.posts.following.$get({
    query: { offset: offset.toString() },
  })

  const data = (await res.json()) as PostsWithParentResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.data
}

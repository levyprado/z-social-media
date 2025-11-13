import { user } from '@/db/schema/auth'
import { likes } from '@/db/schema/likes'
import { parentPost, parentPostUser, posts } from '@/db/schema/posts'
import { sql } from 'drizzle-orm'

export const postSelectFields = {
  id: posts.id,
  content: posts.content,
  userId: posts.userId,
  parentPostId: posts.parentPostId,
  isLiked: sql<boolean>`${likes.userId} is not null`.as('isLiked'),
  replyCount: posts.replyCount,
  likeCount: posts.likeCount,
  createdAt: posts.createdAt,
}

export const userSelectFields = {
  id: user.id,
  name: user.name,
  username: user.username,
  image: user.image,
  createdAt: user.createdAt,
}

export const parentPostSelectFields = {
  id: parentPost.id,
  content: parentPost.content,
  userId: parentPost.userId,
  parentPostId: parentPost.parentPostId,
  replyCount: parentPost.replyCount,
  likeCount: parentPost.likeCount,
  createdAt: parentPost.createdAt,
}

export const parentPostUserSelectFields = {
  id: parentPostUser.id,
  name: parentPostUser.name,
  username: parentPostUser.username,
  image: parentPostUser.image,
  createdAt: parentPostUser.createdAt,
}

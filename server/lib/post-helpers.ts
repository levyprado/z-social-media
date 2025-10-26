import { user } from 'server/db/schema/auth'
import { parentPost, parentPostUser, posts } from 'server/db/schema/posts'

export const postSelectFields = {
  id: posts.id,
  content: posts.content,
  userId: posts.userId,
  parentPostId: posts.parentPostId,
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

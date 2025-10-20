import {
  alias,
  integer,
  pgTable,
  text,
  timestamp,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core'
import { user } from './auth'

export const posts = pgTable('posts', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  content: text('content').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  parentPostId: integer('parent_post_id').references(
    (): AnyPgColumn => posts.id,
  ),
  replyCount: integer('reply_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const parentPost = alias(posts, 'parentPost')
export const parentPostUser = alias(user, 'parentPostUser')

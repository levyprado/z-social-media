import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth'

export const follows = pgTable(
  'follows',
  {
    followerId: text('follower_id')
      .notNull()
      .references(() => user.id),
    followingId: text('following_id')
      .notNull()
      .references(() => user.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.followerId, table.followingId] })],
)

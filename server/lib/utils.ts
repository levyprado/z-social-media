import { eq } from 'drizzle-orm'
import db from '../db'
import { user } from '../db/schema/auth'

export const generateUniqueUsername = async (baseUsername: string) => {
  let username = baseUsername
  let counter = 1

  while (true) {
    const [existing] = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .limit(1)

    if (!existing) return username

    username = `${baseUsername}${counter}`
    counter++

    if (counter > 100) {
      username = `${baseUsername}${Date.now()}`
      break
    }
  }
  return username
}

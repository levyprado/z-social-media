import db from '@/server/db'
import { user as usersTable } from '@/server/db/schema/auth'
import type { ErrorResponse, SuccessResponse } from '@/shared/types'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'

const userRouter = new Hono().get('/:username', async (c) => {
  const { username } = c.req.param()

  try {
    const [user] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        username: usersTable.username,
        image: usersTable.image,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.username, username))

    if (!user) {
      return c.json<ErrorResponse>(
        { success: false, error: 'User not found' },
        404,
      )
    }

    return c.json<SuccessResponse<{ user: typeof user }>>({
      success: true,
      message: 'User successfully fetched',
      data: { user },
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return c.json<ErrorResponse>(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : null,
      },
      500,
    )
  }
})

export default userRouter

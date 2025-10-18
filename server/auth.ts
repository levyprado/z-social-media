import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { eq } from 'drizzle-orm'
import db from './db'
import { account, session, user, verification } from './db/schema/auth'
import { generateUniqueUsername } from './lib/utils'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: async (profile) => {
        const githubUsername = profile.login.toLowerCase()

        const [existingUser] = await db
          .select()
          .from(user)
          .where(eq(user.username, githubUsername))
          .limit(1)

        let finalUsername = githubUsername
        if (existingUser) {
          finalUsername = await generateUniqueUsername(githubUsername)
        }

        return {
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          username: finalUsername,
          emailVerified: true,
        }
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
  trustedOrigins: ['http://localhost:5173'],
  user: {
    additionalFields: {
      bio: {
        type: 'string',
        required: false,
      },
      website: {
        type: 'string',
        required: false,
      },
    },
  },
})

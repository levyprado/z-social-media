import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import db from './db'
import { account, session, user, verification } from './db/schema/auth'

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
      mapProfileToUser: (profile) => {
        return {
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          username: profile.login.toLowerCase(),
          displayUsername: profile.login,
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
})

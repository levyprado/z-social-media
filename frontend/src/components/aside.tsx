import { cn } from '@/lib/utils'
import SearchInput from './ui/search-input'

export default function Aside() {
  return (
    <aside className='sticky top-0 hidden h-dvh w-[275px] flex-col gap-4 border-l px-4 py-2 lg:flex'>
      <SearchInput />

      <div className='bg-card flex grow flex-col gap-4 overflow-y-auto rounded-xl p-4'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-bold'>Z - Social Media App</h3>
          <p className='text-muted-foreground text-sm'>
            A full-stack Twitter/X clone showcasing a wide range of modern web
            development features.
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <FeatureSection title='🔐 Authentication & Authorization'>
            <FeatureItem>Sign up/in with email & password</FeatureItem>
            <FeatureItem>GitHub OAuth integration</FeatureItem>
            <FeatureItem>Protected routes & session management</FeatureItem>
          </FeatureSection>

          <FeatureSection title='👤 User Profiles'>
            <FeatureItem>Dynamic profile pages</FeatureItem>
            <FeatureItem>Editable profile (name, bio, website)</FeatureItem>
            <FeatureItem>Follow/unfollow functionality</FeatureItem>
            <FeatureItem>
              Profile tabs (Posts, Posts & Replies, Likes)
            </FeatureItem>
          </FeatureSection>

          <FeatureSection title='👥 Followers/Following System'>
            <FeatureItem>Followers/Following lists</FeatureItem>
            <FeatureItem>Infinite scroll on lists</FeatureItem>
          </FeatureSection>

          <FeatureSection title='🏠 Home Feed'>
            <FeatureItem>Dual-tab feed (All/Following)</FeatureItem>
            <FeatureItem>Sticky tabs with scroll-aware behavior</FeatureItem>
            <FeatureItem>Infinite scroll with loading skeletons</FeatureItem>
          </FeatureSection>

          <FeatureSection title='📝 Posts & Replies'>
            <FeatureItem>Create posts and replies (280 chars)</FeatureItem>
            <FeatureItem>Nested threading for replies</FeatureItem>
            <FeatureItem>Instant feed updates on post creation</FeatureItem>
          </FeatureSection>

          <FeatureSection title='💬 Post Detail Page'>
            <FeatureItem>Displays post and parent post chain</FeatureItem>
            <FeatureItem>Infinite scroll for replies</FeatureItem>
          </FeatureSection>

          <FeatureSection title='💚 Interactions'>
            <FeatureItem>Like/unlike posts with real-time counts</FeatureItem>
            <FeatureItem>Reply to posts</FeatureItem>
          </FeatureSection>

          <FeatureSection title='🔗 Sharing'>
            <FeatureItem>Copy link to post</FeatureItem>
            <FeatureItem>Web Share API integration</FeatureItem>
          </FeatureSection>

          <FeatureSection title='🎨 UI/UX Features'>
            <FeatureItem>Dark/Light theme toggle with persistence</FeatureItem>
            <FeatureItem>Responsive design & smooth animations</FeatureItem>
          </FeatureSection>

          <FeatureSection title='🧭 Navigation & Sidebar'>
            <FeatureItem>Sticky sidebar with navigation</FeatureItem>
            <FeatureItem>User dropdown menu</FeatureItem>
          </FeatureSection>

          <FeatureSection title='📊 Data & Performance'>
            <FeatureItem>Infinite scroll pagination everywhere</FeatureItem>
            <FeatureItem>TanStack Query for caching & server state</FeatureItem>
            <FeatureItem>Efficient database queries</FeatureItem>
          </FeatureSection>

          <FeatureSection title='🛠️ Technical Features'>
            <FeatureItem>TypeScript, Hono, Drizzle ORM, PostgreSQL</FeatureItem>
            <FeatureItem>TanStack Router & Query</FeatureItem>
            <FeatureItem>Zod for validation</FeatureItem>
          </FeatureSection>

          <FeatureSection title='🚧 Not Implemented (WIP)'>
            <FeatureItem isWip>Explore page</FeatureItem>
            <FeatureItem isWip>Messages/DMs</FeatureItem>
            <FeatureItem isWip>Reposts/Quote tweets</FeatureItem>
            <FeatureItem isWip>Image/media uploads</FeatureItem>
            <FeatureItem isWip>Notifications system</FeatureItem>
            <FeatureItem isWip>Search functionality</FeatureItem>
          </FeatureSection>
        </div>
      </div>
    </aside>
  )
}

function FeatureSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col gap-2'>
      <h4 className='font-semibold'>{title}</h4>
      <ul className='flex flex-col gap-1.5 pl-2'>{children}</ul>
    </div>
  )
}

function FeatureItem({
  children,
  isWip = false,
}: {
  children: React.ReactNode
  isWip?: boolean
}) {
  return (
    <li className='text-muted-foreground flex items-start gap-2 text-sm'>
      <span
        className={cn(
          'mt-1 size-1.5 shrink-0 rounded-full',
          isWip ? 'bg-destructive/70' : 'bg-primary/70',
        )}
      ></span>
      <span>{children}</span>
    </li>
  )
}

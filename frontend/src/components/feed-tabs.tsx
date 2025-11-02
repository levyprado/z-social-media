import { useFeedTab, type FeedTab } from '@/features/post/hooks/use-feed-tab'
import { cn } from '@/lib/utils'

const feedTabs = [
  { label: 'All', value: 'all' as FeedTab },
  { label: 'Following', value: 'following' as FeedTab },
]

export default function FeedTabs() {
  const { tab: currentTab, setFeedTab } = useFeedTab()

  return (
    <div className='border-b'>
      <nav className='flex w-full gap-2 rounded-lg px-2 py-1.5'>
        {feedTabs.map((tab) => (
          <button
            onClick={() => setFeedTab(tab.value)}
            key={tab.value}
            className={cn(
              'text-muted-foreground hover:bg-hover grow cursor-pointer rounded-md p-1.5 text-center transition-all',
              tab.value === currentTab && 'bg-hover text-primary font-semibold',
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

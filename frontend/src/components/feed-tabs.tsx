import { useFeedTab, type FeedTab } from '@/features/post/hooks/use-feed-tab'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

const feedTabs = [
  { label: 'All', value: 'all' as FeedTab },
  { label: 'Following', value: 'following' as FeedTab },
]

export default function FeedTabs() {
  const [isSticky, setIsSticky] = useState(false)
  const lastScrollY = useRef(0)
  const { tab: currentTab, setFeedTab } = useFeedTab()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY.current || currentScrollY <= 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'bg-background/85 dark:bg-background/65 sticky top-0 z-10 w-full border-b backdrop-blur-md transition-transform duration-300',
        !isSticky && '-translate-y-full',
      )}
    >
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

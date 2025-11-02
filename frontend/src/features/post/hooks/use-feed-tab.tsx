import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FeedTab = 'all' | 'following'

const FEED_TAB_KEY = 'feedTab'

type FeedTabStore = {
  tab: FeedTab
  setFeedTab: (newTab: FeedTab) => void
}

export const useFeedTab = create<FeedTabStore>()(
  persist(
    (set) => ({
      tab: 'all',
      setFeedTab: (newTab) => set({ tab: newTab }),
    }),
    { name: FEED_TAB_KEY },
  ),
)

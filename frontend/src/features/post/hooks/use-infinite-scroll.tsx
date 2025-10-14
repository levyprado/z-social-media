import { useEffect, useRef } from 'react'

type UseInfiniteScrollProps = {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export default function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!observerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return observerRef
}

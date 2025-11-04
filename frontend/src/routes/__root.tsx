import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { type QueryClient } from '@tanstack/react-query'
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { User } from 'better-auth'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user: User | null
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootComponent() {
  return (
    <>
      <ThemeProvider>
        <Outlet />
        <Toaster
          richColors
          position='bottom-center'
          visibleToasts={1}
          toastOptions={{
            className: 'font-sans',
          }}
        />
      </ThemeProvider>
    </>
  )
}

function NotFoundComponent() {
  return (
    <div className='grid min-h-dvh place-items-center px-4'>
      <main className='flex flex-col items-center justify-center gap-5'>
        <h1 className='text-center text-3xl font-semibold'>
          404 - Page Not Found
        </h1>
        <Button
          variant='secondary'
          className='size-fit'
          render={(props) => (
            <Link to='/login' {...props}>
              Go back
            </Link>
          )}
        ></Button>
      </main>
    </div>
  )
}

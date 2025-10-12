import { MoonIcon, SunIcon } from 'lucide-react'
import * as React from 'react'

import { useTheme } from './theme-provider'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <button onClick={toggleTheme} className='group cursor-pointer py-2'>
      <div className='group-hover:bg-accent/80 rounded-full p-3 transition-[background-color] ease-out group-hover:transition-none md:flex md:gap-5 [&_svg]:size-6 md:[&_svg]:size-7'>
        <MoonIcon className='dark:hidden' />
        <SunIcon className='hidden dark:block' />
        <span className='hidden md:block md:truncate md:text-xl'>
          Toggle theme
        </span>
      </div>
    </button>
  )
}

import { SearchIcon } from 'lucide-react'
import { useId, type ComponentProps } from 'react'
import { Input } from './input'
import { Label } from './label'

type SearchInputProps = {
  label?: string
} & ComponentProps<'input'>

export default function SearchInput({ label }: SearchInputProps) {
  const id = useId()

  return (
    <div className='*:not-first:mt-2 w-full'>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className='relative'>
        <Input
          id={id}
          className='peer ps-9'
          placeholder='Search...'
          type='search'
        />
        <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50'>
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  )
}

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { AnyFieldApi } from '@tanstack/react-form'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import FieldError from './field-error'

type PasswordInputProps = {
  field: AnyFieldApi
  label: string
  required?: boolean
}

export function PasswordField({
  field,
  label,
  required = false,
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState)

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={field.name}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>
      <div className='relative'>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          type={isPasswordVisible ? 'text' : 'password'}
          className='pe-9'
          required={required}
        />
        <button
          className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md outline-none transition-[color,box-shadow] focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          type='button'
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isPasswordVisible}
          aria-controls={field.name}
        >
          {isPasswordVisible ? (
            <EyeOffIcon size={16} aria-hidden='true' />
          ) : (
            <EyeIcon size={16} aria-hidden='true' />
          )}
        </button>
      </div>
      <FieldError field={field} />
    </div>
  )
}

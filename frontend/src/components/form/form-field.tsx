import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { AnyFieldApi } from '@tanstack/react-form'
import FieldError from './field-error'

type FormFieldProps = {
  field: AnyFieldApi
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  required?: boolean
}

export function FormField({
  field,
  label,
  type = 'text',
  placeholder,
  required = false,
}: FormFieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={field.name}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      <FieldError field={field} />
    </div>
  )
}

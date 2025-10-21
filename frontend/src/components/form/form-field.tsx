import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { AnyFieldApi } from '@tanstack/react-form'
import FieldError from './field-error'

type FormFieldProps = {
  field: AnyFieldApi
  label: string
  as?: 'input' | 'textarea'
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  required?: boolean
}

export function FormField({
  field,
  label,
  as = 'input',
  type = 'text',
  placeholder,
  required = false,
}: FormFieldProps) {
  const commonProps = {
    id: field.name,
    name: field.name,
    value: field.state.value,
    onBlur: field.handleBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      field.handleChange(e.target.value),
    placeholder,
    required,
  }

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={field.name}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>
      {as === 'textarea' ? (
        <Textarea {...commonProps} className='border-border max-h-[200px]' />
      ) : (
        <Input {...commonProps} type={type} />
      )}
      <FieldError field={field} />
    </div>
  )
}

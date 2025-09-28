import type { AnyFieldApi } from '@tanstack/react-form'

export default function FieldError({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <span className='text-destructive text-xs font-medium'>
          {field.state.meta.errors[0].message}
        </span>
      ) : null}
    </>
  )
}

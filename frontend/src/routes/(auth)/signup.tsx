import AuthCard from '@/features/auth/components/auth-card'
import SignupForm from '@/features/auth/components/signup-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className='from-background/15 via-background to-primary/15 fixed inset-0 z-0 bg-gradient-to-br' />

      <AuthCard title='Welcome to Z' description='Create your account'>
        <SignupForm />
      </AuthCard>
    </>
  )
}

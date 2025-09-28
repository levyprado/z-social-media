import AuthCard from '@/features/auth/components/auth-card'
import LoginForm from '@/features/auth/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className='from-primary/15 via-background to-background/15 fixed inset-0 z-0 bg-gradient-to-br' />

      <AuthCard title='Welcome back' description='Sign in to Z' isLogin>
        <LoginForm />
      </AuthCard>
    </>
  )
}

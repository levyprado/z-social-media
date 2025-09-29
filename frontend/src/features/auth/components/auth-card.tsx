import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

type AuthCardProps = {
  title: string
  description: string
  children: React.ReactNode
  isLogin?: boolean
}

export default function AuthCard({
  title,
  description,
  children,
  isLogin = false,
}: AuthCardProps) {
  return (
    <Card className='bg-card/70 relative z-10 mx-auto w-full max-w-lg border-0 shadow-md'>
      <CardHeader className='gap-0'>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <CardDescription className='text-base'>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter>
        <p className='text-muted-foreground text-sm'>
          {isLogin ? "Don't" : 'Already'} have an account?{' '}
          <Link
            to={isLogin ? '/signup' : '/login'}
            className='text-primary font-medium hover:underline'
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

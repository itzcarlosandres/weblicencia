import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { LoginForm } from '@/components/auth/login-form'
import { authOptions } from '@/auth'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Inicia sesión en tu cuenta de WebLicencia',
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    const destination = (session.user as any)?.role === 'ADMIN' ? '/admin' : '/dashboard'
    redirect(destination)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

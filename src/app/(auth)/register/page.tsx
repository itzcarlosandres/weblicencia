import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { RegisterForm } from '@/components/auth/register-form'
import { authOptions } from '@/auth'

export const metadata: Metadata = {
  title: 'Registrarse',
  description: 'Crea una nueva cuenta en WebLicencia',
}

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    const destination = (session.user as any)?.role === 'ADMIN' ? '/admin' : '/dashboard'
    redirect(destination)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}

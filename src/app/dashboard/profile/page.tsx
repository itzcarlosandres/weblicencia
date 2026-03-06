import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Mi Perfil',
  description: 'Edita tu perfil de WebLicencia',
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mi Perfil</h1>

        <Card>
          <CardHeader>
            <CardTitle>Información de Cuenta</CardTitle>
            <CardDescription>Tus datos personales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <div className="p-3 bg-muted rounded-md border">
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="p-3 bg-muted rounded-md border">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rol</label>
              <div className="p-3 bg-muted rounded-md border">
                {user.role === 'ADMIN' ? '👑 Administrador' : '👤 Cliente'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Miembro desde</label>
              <div className="p-3 bg-muted rounded-md border">
                {new Date(user.createdAt).toLocaleDateString('es-ES')}
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Para editar tu información, contacta a nuestro soporte.
              </p>
              <Button variant="outline">Contactar Soporte</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

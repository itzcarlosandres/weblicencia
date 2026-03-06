import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Mis Claves',
  description: 'Tus claves de licencia descargadas',
}

export default async function KeysPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mis Claves de Licencia</h1>
          <p className="text-muted-foreground">Claves descargadas desde tus órdenes</p>
        </div>

        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              Todas tus claves de licencia se mostrarán aquí después de completar una compra.
            </p>
            <p className="text-sm text-muted-foreground">
              Accede a tus órdenes para ver las claves asociadas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Configuración',
  description: 'Ajustes del sistema',
}

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Configuración</h1>
          <p className="text-muted-foreground">Ajustes y preferencias del sistema</p>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Nombre y descripción de tu tienda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre de la Tienda
                </label>
                <input
                  type="text"
                  defaultValue="WebLicencia"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL del Sitio
                </label>
                <input
                  type="url"
                  defaultValue="https://tu-dominio.com"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  disabled
                />
              </div>
              <Button disabled>Guardar Cambios</Button>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
              <CardDescription>Configura Stripe y PayPal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Stripe</h4>
                  <p className="text-sm text-muted-foreground">
                    sk_test_... (modo pruebas)
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Editar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">PayPal</h4>
                  <p className="text-sm text-muted-foreground">
                    Configurado en Sandbox
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Email</CardTitle>
              <CardDescription>Email de notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email de Remitente
                </label>
                <input
                  type="email"
                  defaultValue="noreply@weblicencia.com"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  disabled
                />
              </div>
              <Button disabled>Guardar Cambios</Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
              <CardDescription>Operaciones irreversibles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" disabled>
                Limpiar Base de Datos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Esta acción no se puede deshacer. Elimina todos los datos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

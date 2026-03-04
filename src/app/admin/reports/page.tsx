import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Reportes',
  description: 'Ver reportes y estadísticas',
}

export default async function AdminReportsPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Reportes</h1>
          <p className="text-muted-foreground">Análisis y estadísticas de tu negocio</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">$1,245.50</div>
              <p className="text-sm text-muted-foreground mt-2">+15% vs. ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clientes Nuevos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">42</div>
              <p className="text-sm text-muted-foreground mt-2">Últimos 7 días</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasa de Conversión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">3.2%</div>
              <p className="text-sm text-muted-foreground mt-2">De visitantes a compradores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Producto Más Vendido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Windows 11 Pro</div>
              <p className="text-sm text-muted-foreground mt-2">127 ventas este mes</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Características</CardTitle>
            <CardDescription>Gráficos y reportes detallados coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Los reportes avanzados estarán disponibles en breve. Incluirán gráficos de tendencias, análisis de productos, y más.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

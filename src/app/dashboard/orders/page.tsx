import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mis Órdenes',
  description: 'Historial de tus compras',
}

export default async function OrdersPage() {
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

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
      licenseKeys: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mis Órdenes</h1>
          <p className="text-muted-foreground">Historial de tus compras</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-6">
                Aún no has realizado ninguna compra
              </p>
              <Link href="/products">
                <Button>Explorar Productos</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:border-accent transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Orden #{order.id.slice(0, 8)}</CardTitle>
                      <CardDescription>
                        {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-accent">
                        {formatPrice(order.total)}
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status === 'PAID' && '✓ Pagado'}
                        {order.status === 'PENDING' && '⏳ Pendiente'}
                        {order.status === 'FAILED' && '✗ Falló'}
                        {order.status === 'CANCELED' && 'Cancelado'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Productos */}
                    <div>
                      <h4 className="font-semibold mb-2">Productos:</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm p-2 bg-muted rounded"
                          >
                            <span>{item.product.title}</span>
                            <span>x{item.quantity} - {formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Claves de licencia */}
                    {order.licenseKeys.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Claves de Licencia:</h4>
                        <div className="space-y-2">
                          {order.licenseKeys.map((key) => (
                            <div
                              key={key.id}
                              className="flex justify-between items-center text-sm p-2 bg-muted rounded font-mono"
                            >
                              <span>{key.key}</span>
                              <Badge variant="secondary">Descargada</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Método de pago */}
                    <div className="text-sm text-muted-foreground">
                      Método de pago: {order.paymentMethod?.toUpperCase() || 'N/A'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

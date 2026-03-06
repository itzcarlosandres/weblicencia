import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils'
import Link from 'next/link'
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Key,
  ArrowRight,
  Package,
  CreditCard,
  History,
  Calendar
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mis Adquisiciones | Dashboard',
  description: 'Historial de activos y licencias adquiridas',
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
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <History className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Terminal de Usuario</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Mis <span className="text-white/20">Órdenes</span>
          </h1>
          <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.2em] leading-loose max-w-xl">
            Siga el estado de sus activaciones y acceda a sus credenciales de seguridad en tiempo real.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="py-24 text-center space-y-8 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-white/[0.02] border border-white/5 rounded-[2rem] mx-auto flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-white/10" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tight">Bóveda Vacía</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 max-w-xs mx-auto">
                No se han detectado transacciones registradas en su historial de activos.
              </p>
            </div>
            <Link href="/products">
              <Button className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-accent hover:text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-2xl shadow-white/5 border-none group">
                Explorar Catálogo
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <Card key={order.id} className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden group hover:border-accent/20 transition-all duration-500 shadow-2xl">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-12 items-stretch">
                    {/* Lateral Order Info */}
                    <div className="lg:col-span-3 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01] flex flex-col justify-between gap-8">
                      <div className="space-y-2">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] block">ID Identificador</span>
                        <span className="text-xs font-black text-white uppercase font-mono tracking-tighter">{order.id.slice(0, 12)}...</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Monto de Adquisición</span>
                          <span className="text-3xl font-black text-accent tracking-tighter">{formatPrice(order.total)}</span>
                        </div>
                        <Badge className={`${getStatusColor(order.status)} border-none py-1.5 px-4 text-[8px] font-black uppercase tracking-widest w-fit`}>
                          {order.status === 'PAID' ? <CheckCircle2 className="w-3 h-3 mr-2" /> : order.status === 'PENDING' ? <Clock className="w-3 h-3 mr-2" /> : <XCircle className="w-3 h-3 mr-2" />}
                          {order.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 p-8 lg:p-10 space-y-10">
                      {/* Header row for Order details */}
                      <div className="flex flex-wrap items-center gap-8 border-b border-white/5 pb-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-white/20 mb-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Registrada</span>
                          </div>
                          <p className="text-[10px] font-black text-white uppercase">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-white/20 mb-1">
                            <CreditCard className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Plataforma</span>
                          </div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">{order.paymentMethod || 'Sistema Manual'}</p>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-white/20" />
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Ítems de Operación</h4>
                        </div>
                        <div className="grid gap-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                              <div className="space-y-1">
                                <p className="text-[11px] font-black text-white uppercase tracking-tight">{item.product.title}</p>
                                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Unidad: {formatPrice(item.price)}</p>
                              </div>
                              <span className="text-[10px] font-black text-accent uppercase tracking-widest">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Keys (Only if PAID) */}
                      {order.status === 'PAID' && order.licenseKeys.length > 0 ? (
                        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                          <div className="flex items-center gap-3">
                            <Key className="w-4 h-4 text-green-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/50">Credenciales Autorizadas</h4>
                          </div>
                          <div className="grid gap-3">
                            {order.licenseKeys.map((key) => (
                              <div key={key.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-green-500/[0.03] border border-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                                <span className="font-mono text-xs font-black text-green-500 select-all tracking-wider">{key.key}</span>
                                <div className="flex items-center gap-3">
                                  <Badge className="bg-green-500/10 text-green-500 border-none px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full">Validada</Badge>
                                  <button className="p-2 hover:bg-green-500/10 rounded-xl transition-colors">
                                    <ArrowRight className="w-4 h-4 text-green-500" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        order.status === 'PENDING' && (
                          <div className="p-8 rounded-[2rem] bg-accent/5 border border-accent/10 flex flex-col items-center text-center space-y-3">
                            <Clock className="w-6 h-6 text-accent animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Validación de seguridad en progreso</p>
                            <p className="text-[8px] font-bold text-accent/40 uppercase tracking-widest max-w-xs leading-loose">Sus credenciales serán enviadas a esta terminal una vez que el pago sea validado en la central.</p>
                          </div>
                        )
                      )}
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

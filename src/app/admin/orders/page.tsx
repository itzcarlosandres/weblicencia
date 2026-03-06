import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { OrderListClient } from '@/components/admin/order-list-client'

export const metadata: Metadata = {
  title: 'Protocolo de Órdenes | Admin Portal',
  description: 'Control central de transacciones y validación de pagos',
}

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-0.5 w-12 bg-accent/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Registro de Transacciones</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Gestión de <span className="text-white/20">Órdenes</span>
          </h1>
          <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.2em] leading-loose max-w-xl">
            Valide pagos manuales, gestione estados de entrega y supervise el flujo operativo de la bóveda digital.
          </p>
        </div>

        <OrderListClient initialOrders={orders} />
      </div>
    </div>
  )
}

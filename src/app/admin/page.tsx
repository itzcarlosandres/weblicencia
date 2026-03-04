import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatPrice, cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Key, ShoppingBag, ChevronRight, BarChart3, Users, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Panel de administración de WebLicencia',
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  const stats = await prisma.$transaction([
    prisma.order.aggregate({
      where: { status: 'PAID' },
      _sum: { total: true },
    }),
    prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.user.count(),
    prisma.product.count({
      where: { active: true },
    }),
  ])

  const [salesResult, ordersToday, totalUsers, activeProducts] = stats
  const totalSales = salesResult._sum.total || 0

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-accent to-white bg-clip-text text-transparent tracking-tighter uppercase leading-none">
            CENTRAL DE CONTROL <span className="text-white/20">ADMIN</span>
          </h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">Habilitado: Gestión Maestra de Productos y Licencias</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Tarjetas de navegación optimizadas */}
          <Card className="hover:border-accent/40 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-3xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl font-black uppercase tracking-tight">Catalogo Pro</CardTitle>
              <CardDescription className="text-xs font-medium uppercase tracking-widest opacity-50">Inventario y Precios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/products">
                <Button variant="ghost" className="w-full justify-between hover:bg-white/5 text-xs font-bold uppercase tracking-widest border border-white/5">
                  Ver Todo
                  <ChevronRight className="w-4 h-4 text-accent" />
                </Button>
              </Link>
              <Link href="/admin/products/new">
                <Button className="w-full bg-white !text-[#050505] hover:bg-accent hover:text-white font-black uppercase tracking-widest text-[10px] h-12 shadow-xl shadow-white/5 transition-all border-none">
                  Crear Master SKU
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:border-accent/40 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-3xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Key className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-black uppercase tracking-tight">Cripto Claves</CardTitle>
              <CardDescription className="text-xs font-medium uppercase tracking-widest opacity-50">Stock y Distribución</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/keys">
                <Button variant="outline" className="w-full h-12 border-white/10 hover:border-accent/40 text-[10px] font-black uppercase tracking-widest bg-white/5 !text-white transition-all">
                  Gestionar Bóveda
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:border-accent/40 hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-3xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-green-500/10 transition-colors" />
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-xl font-black uppercase tracking-tight">Transacciones</CardTitle>
              <CardDescription className="text-xs font-medium uppercase tracking-widest opacity-50">Ventas y Logística</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/orders">
                <Button variant="outline" className="w-full h-12 border-white/10 hover:border-accent/40 text-[10px] font-black uppercase tracking-widest bg-white/5 !text-white transition-all">
                  Monitor de Pedidos
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats con diseño Premium */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/[0.02] border-white/5 hover:border-accent/30 transition-colors backdrop-blur-3xl">
            <CardContent className="pt-8">
              <div className="text-4xl font-black text-accent mb-1 tracking-tight">
                {formatPrice(totalSales)}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Ventas Totales</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5 hover:border-accent/30 transition-colors backdrop-blur-3xl">
            <CardContent className="pt-8">
              <div className="text-4xl font-black text-white mb-1 tracking-tight">
                {ordersToday}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Órdenes Hoy</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5 hover:border-accent/30 transition-colors backdrop-blur-3xl">
            <CardContent className="pt-8">
              <div className="text-4xl font-black text-white mb-1 tracking-tight">
                {totalUsers}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Usuarios</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5 hover:border-accent/30 transition-colors backdrop-blur-3xl">
            <CardContent className="pt-8">
              <div className="text-4xl font-black text-white mb-1 tracking-tight">
                {activeProducts}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Productos Activos</p>
            </CardContent>
          </Card>
        </div>

        {/* Sección de Gestión de Productos Críticos */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-widest text-white/60">Gestión de Inventario Crítico</h2>
            <Link href="/admin/products">
              <Button variant="link" className="text-accent text-xs font-bold uppercase tracking-widest">Ver Catálogo Completo →</Button>
            </Link>
          </div>

          <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Producto</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Estado Stock</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(await prisma.product.findMany({ take: 5, orderBy: { updatedAt: 'desc' } })).map((p) => (
                    <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">{p.image || '📦'}</div>
                          <span className="text-sm font-bold text-white group-hover:text-accent transition-colors">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", p.stock > 10 ? "bg-green-500" : "bg-red-500 animate-pulse")} />
                          <span className="text-xs font-bold">{p.stock} unidades</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/products/${p.id}`}>
                          <Button size="sm" variant="ghost" className="hover:bg-accent/10 hover:text-accent">
                            EDITAR
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

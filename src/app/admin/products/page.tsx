import { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Edit2, Plus, Box, ShieldCheck } from 'lucide-react'
import { DeleteProductButton } from './_components/delete-product-button'

export const metadata: Metadata = {
  title: 'Gestionar Productos | Admin',
  description: 'Administra el catálogo de licencias de software',
}

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  const products = await prisma.product.findMany({
    include: {
      licenseKeys: {
        where: { status: 'AVAILABLE' },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-5xl font-black bg-gradient-to-r from-accent to-white bg-clip-text text-transparent uppercase tracking-tighter leading-none">
              Catálogo <span className="text-white/20">Maestro</span>
            </h1>
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Gestión Total de Inventario Digital</p>
          </div>
          <Link href="/admin/products/new">
            <Button size="lg" className="bg-white text-[#050505] hover:bg-accent hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-14 px-8 shadow-2xl shadow-accent/10 transition-all border-none">
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Master SKU
            </Button>
          </Link>
        </div>

        <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-2xl rounded-3xl">
          <CardHeader className="border-b border-white/5 bg-white/[0.01] p-8">
            <div className="flex items-center gap-2 mb-4 text-accent">
              <Box className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Bóveda de Software</span>
            </div>
            <CardTitle className="text-3xl font-black text-white uppercase tracking-tight">Productos Registrados ({products.length})</CardTitle>
            <CardDescription className="text-white/40 text-sm font-medium">Control central de licencias y disponibilidad en plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {products.length === 0 ? (
              <div className="text-center py-32 bg-white/[0.01]">
                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5 group transition-colors">
                  <Box className="w-10 h-10 text-white/20 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Bóveda Vacía</h3>
                <p className="text-white/30 text-sm font-medium mb-10 max-w-xs mx-auto">Tu catálogo está listo. Comienza integrando tu primer producto digital para iniciar ventas.</p>
                <Link href="/admin/products/new">
                  <Button variant="ghost" className="border border-white/20 text-white hover:border-accent hover:bg-accent/20 h-12 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all bg-transparent hover:text-white">
                    Crear mi primer producto
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-white/[0.01] text-white/30 border-b border-white/5">
                      <th className="text-left py-6 px-8 font-black uppercase tracking-[0.2em] text-[10px]">Identificador</th>
                      <th className="text-left py-6 px-8 font-black uppercase tracking-[0.2em] text-[10px]">Sectores</th>
                      <th className="text-left py-6 px-8 font-black uppercase tracking-[0.2em] text-[10px]">Valoración</th>
                      <th className="text-left py-6 px-8 font-black uppercase tracking-[0.2em] text-[10px]">Reserva</th>
                      <th className="text-left py-6 px-8 font-black uppercase tracking-[0.2em] text-[10px]">Seguridad</th>
                      <th className="text-left py-6 px-8 font-black uppercase tracking-[0.2em] text-[10px]">Estado</th>
                      <th className="text-right py-6 px-8 font-black uppercase tracking-[0.2em] text-[10px]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((product) => (
                      <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-4">
                            {product.image ? (
                              <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10 group-hover:border-accent/40 transition-all" />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/40 transition-all">
                                <Box className="w-6 h-6 text-white/20" />
                              </div>
                            )}
                            <div>
                              <p className="font-black text-white text-lg group-hover:text-accent transition-colors leading-none mb-1">{product.title}</p>
                              <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-white/40 font-bold text-xs uppercase tracking-widest">
                          {product.category}
                        </td>
                        <td className="py-6 px-8">
                          <span className="text-lg font-black text-accent tracking-tighter">
                            {formatPrice(product.price)}
                          </span>
                        </td>
                        <td className="py-6 px-8 font-black text-white/60 font-mono text-xs">
                          {product.stock}
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-2 text-green-500 font-black text-sm">
                            <ShieldCheck className="w-4 h-4" />
                            {product.licenseKeys.length}
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          {product.active ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-widest border border-green-500/20">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                              Activo
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-white/30 text-[9px] font-black uppercase tracking-widest border border-white/10">
                              Inactivo
                            </div>
                          )}
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/products/${product.id}`}>
                              <Button size="icon" variant="ghost" className="hover:text-accent hover:bg-white/5 rounded-xl border border-transparent hover:border-accent/20">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </Link>
                            <DeleteProductButton id={product.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

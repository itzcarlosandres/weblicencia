import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { ImportKeysForm } from './_components/import-keys-form'
import { KeysList } from './_components/keys-list'
import { Key, CheckCircle, ShoppingBag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gestionar Claves | WebLicencia',
  description: 'Administra el inventario de claves de licencia',
}

export default async function AdminKeysPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  const [stats, totalKeys, products, allKeys] = await Promise.all([
    prisma.licenseKey.groupBy({
      by: ['status'],
      _count: true,
    }),
    prisma.licenseKey.count(),
    prisma.product.findMany({
      where: { active: true },
      select: { id: true, title: true }
    }),
    prisma.licenseKey.findMany({
      include: {
        product: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  ])

  const availableKeys = stats.find((s: any) => s.status === 'AVAILABLE')?._count || 0
  const soldKeys = stats.find((s: any) => s.status === 'SOLD')?._count || 0

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-accent to-white bg-clip-text text-transparent tracking-tighter uppercase leading-none">
            BÓVEDA DE <span className="text-white/20">CLAVES</span>
          </h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">Gestión de Activos Digitales en Tiempo Real</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/[0.02] border-white/5 overflow-hidden relative group backdrop-blur-3xl rounded-3xl p-4">
            <div className="absolute right-0 bottom-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
              <Key size={120} />
            </div>
            <CardContent className="pt-8">
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">{totalKeys}</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Total Master Keybase</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5 overflow-hidden relative group backdrop-blur-3xl rounded-3xl p-4">
            <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-green-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute right-0 bottom-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform text-green-500">
              <CheckCircle size={120} />
            </div>
            <CardContent className="pt-8">
              <div className="text-5xl font-black text-green-500 mb-2 tracking-tighter">{availableKeys}</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Disponibilidad Inmediata</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5 overflow-hidden relative group backdrop-blur-3xl rounded-3xl p-4">
            <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute right-0 bottom-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform text-accent">
              <ShoppingBag size={120} />
            </div>
            <CardContent className="pt-8">
              <div className="text-5xl font-black text-accent mb-2 tracking-tighter">{soldKeys}</div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Desplegadas con Éxito</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-16">
          <div className="max-w-2xl mx-auto">
            <ImportKeysForm products={products} />
          </div>

          <div className="w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Registros de <span className="text-accent">Seguridad</span></h2>
              <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mt-1">Base de Datos de Licencias Activas</p>
            </div>
            <KeysList keys={allKeys as any} />
          </div>
        </div>
      </div>
    </div>
  )
}

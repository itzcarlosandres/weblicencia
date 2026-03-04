import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImportKeysForm } from './_components/import-keys-form'
import { KeysList } from './_components/keys-list'
import { Key, CheckCircle, ShoppingBag, Database, ShieldCheck, PlusSquare } from 'lucide-react'

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
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-accent to-white bg-clip-text text-transparent tracking-tighter uppercase leading-none">
              BÓVEDA DE <span className="text-white/20">CLAVES</span>
            </h1>
            <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">Gestión de Activos Digitales en Tiempo Real</p>
          </div>

          <div className="flex gap-4">
            {/* Stats en miniatura para la cabecera opcionalmente aquí */}
          </div>
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

        <Tabs defaultValue="inventory" className="w-full space-y-12">
          <div className="flex justify-center">
            <TabsList className="bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl h-auto gap-2 backdrop-blur-xl">
              <TabsTrigger
                value="inventory"
                className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 data-[state=active]:bg-white data-[state=active]:text-black transition-all gap-2"
              >
                <Database className="w-4 h-4" /> Inventario de Bóveda
              </TabsTrigger>
              <TabsTrigger
                value="import"
                className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 data-[state=active]:bg-accent data-[state=active]:text-white transition-all gap-2"
              >
                <PlusSquare className="w-4 h-4" /> Inyección de Claves
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="inventory" className="mt-0 outline-none">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Registros de <span className="text-accent">Seguridad</span></h2>
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Base de Datos de Licencias Activas</p>
                </div>
              </div>
              <KeysList keys={allKeys as any} />
            </div>
          </TabsContent>

          <TabsContent value="import" className="mt-0 outline-none">
            <ImportKeysForm products={products} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Key, User, Shield, ArrowRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mi Dashboard',
  description: 'Tu panel de control en WebLicencia',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const isAdmin = (session.user as any)?.role === 'ADMIN'

  return (
    <div className="min-h-screen bg-[#050505] py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Admin Call to Action */}
        {isAdmin && (
          <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent/20 via-accent/5 to-transparent border border-accent/30 p-8 md:p-12 group transition-all hover:bg-accent/25">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-black text-[10px] font-black uppercase tracking-widest">
                  <Shield className="w-3 h-3 fill-current" />
                  Acceso de Élite Detectado
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                  CENTRAL DE <span className="text-accent underline decoration-accent/30 underline-offset-8">ADMINISTRACIÓN</span>
                </h2>
                <p className="text-white/50 text-sm max-w-xl font-medium tracking-wide">
                  Tienes privilegios de administrador global. Gestiona el catálogo de productos,
                  monitorea las transacciones en tiempo real y controla las bóvedas de licencias.
                </p>
              </div>
              <Link href="/admin">
                <Button size="lg" className="bg-white text-black hover:bg-accent hover:text-white h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-xs group/btn">
                  CONFIGURAR PRODUCTOS
                  <Zap className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Bienvenido, <span className="text-white/40">{session.user?.name}</span>
            </h1>
            <p className="text-white/20 text-sm font-bold uppercase tracking-[0.3em]">Gestión de Cuenta y Activos</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Card: Mis Compras */}
          <Card className="bg-white/[0.02] border-white/5 hover:border-white/20 transition-all group overflow-hidden backdrop-blur-3xl rounded-3xl">
            <CardHeader className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors text-white">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Mis Compras</CardTitle>
              <CardDescription className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-2">Historial de Transacciones</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Link href="/dashboard/orders">
                <Button variant="outline" className="w-full h-12 border-white/10 hover:bg-white hover:text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                  Explorar Historial
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card: Mis Claves */}
          <Card className="bg-white/[0.02] border-white/5 hover:border-white/20 transition-all group overflow-hidden backdrop-blur-3xl rounded-3xl">
            <CardHeader className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors text-white">
                <Key className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Bóveda de Claves</CardTitle>
              <CardDescription className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-2">Activos Digitales Activos</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Link href="/dashboard/keys">
                <Button variant="outline" className="w-full h-12 border-white/10 hover:bg-white hover:text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                  Acceder a Bóveda
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card: Perfil */}
          <Card className="bg-white/[0.02] border-white/5 hover:border-white/20 transition-all group overflow-hidden backdrop-blur-3xl rounded-3xl">
            <CardHeader className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors text-white">
                <User className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Identidad Médica</CardTitle>
              <CardDescription className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-2">Configuración y Seguridad</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full h-12 border-white/10 hover:bg-white hover:text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                  Optimizar Perfil
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center text-[10px] font-bold text-white/10 uppercase tracking-[0.5em] mt-32">
          Protocolo de Seguridad WebLicencia v4.0 Active
        </div>
      </div>
    </div>
  )
}

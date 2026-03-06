import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SettingsClient } from '@/components/admin/settings-client'

export const metadata: Metadata = {
  title: 'Configuración Maestro | Admin Portal',
  description: 'Control de infraestructura y personalización de activos digitales',
}

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  // Fetch current config
  let config = null
  try {
    config = await (prisma as any).appConfig.findUnique({
      where: { id: 'global' }
    })
  } catch (error) {
    console.warn('AppConfig table might not exist yet. Run migrations.')
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-0.5 w-12 bg-accent/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Central de Control</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Ajustes <span className="text-white/20">Globales</span>
          </h1>
          <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.2em] leading-loose max-w-xl">
            Gestión de metadatos, parámetros de visualización y configuración de la bóveda de licencias digitales.
          </p>
        </div>

        <SettingsClient initialConfig={config} />
      </div>
    </div>
  )
}

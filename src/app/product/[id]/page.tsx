import { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, Check, Loader2, ShoppingCart, Monitor, ShieldCheck, Zap, ArrowLeft, Star, Box, Database } from 'lucide-react'
import { ProductDetailClient } from '@/components/product-detail-client'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id }
      ]
    }
  })

  return {
    title: product ? `${product.title} | WebLicencia` : 'Producto No Encontrado',
    description: product?.description || 'Detalle del producto solicitado',
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id }
      ]
    },
    include: {
      licenseKeys: {
        where: { status: 'AVAILABLE' }
      }
    }
  })

  if (!product) {
    return (
      <div className="py-32 px-4 min-h-screen flex items-center bg-background text-white">
        <div className="max-w-lg mx-auto w-full text-center space-y-8">
          <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/5">
            <Box className="w-10 h-10 text-white/20" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold uppercase tracking-tighter">Activo No Encontrado</h1>
            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
              El producto solicitado no existe en nuestra base de datos maestra.
            </p>
          </div>
          <Link href="/products" className="inline-block">
            <Button className="bg-white text-black hover:bg-accent hover:text-white rounded-2xl h-14 px-10 font-bold uppercase tracking-widest text-[10px]">
              Volver al Catálogo
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-background text-white">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/products" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Catálogo
          </Link>
          <span className="text-white/10 text-[10px] tracking-widest">/</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{(product as any).categoryName || (product as any).category || 'Software'}</span>
        </div>

        {/* 3-Column Hero Layout */}
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          {/* Column 1: Gallery (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
              <img
                src={product.image || '/images/placeholders/product-placeholder.webp'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <Badge className="bg-accent text-white border-none px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-xl shadow-2xl">
                  Official License
                </Badge>
              </div>
            </div>
            {/* Thumbnails Placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-accent transition-colors cursor-pointer">
                  <img src={product.image || '/images/placeholders/product-placeholder.webp'} alt="" className="w-full h-full object-cover opacity-30 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Information (5/12) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-green-500">Activación Instantánea</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-white">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                (4.9) +12k ventas verificadas
              </span>
            </div>

            <p className="text-xl text-white/50 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="grid grid-cols-1 gap-6 pt-6">
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-accent/40 transition-all">
                <div className="mt-1 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-white mb-1">Compatibilidad Multi-Dispositivo</h4>
                  <p className="text-[10px] text-white/30 font-medium">Compatible con Windows 10/11 Home & Pro, Mac OS Ventura+</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-accent/40 transition-all">
                <div className="mt-1 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-white mb-1">Entrega Digital Segura</h4>
                  <p className="text-[10px] text-white/30 font-medium">Clave enviada vía SSL directamente a tu dashboard master.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Purchase Sidebar (3/12) */}
          <div className="lg:col-span-3">
            <div className="sticky top-32">
              <ProductDetailClient product={{
                ...product,
                price: Number(product.price)
              }} />
            </div>
          </div>
        </div>

        {/* Lower Section: Tabs and Details */}
        <div className="border-t border-white/5 pt-24">
          {/* Tab Navigation Placeholder (UI only) */}
          <div className="flex items-center gap-12 border-b border-white/5 mb-16">
            <button className="pb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-accent border-b-2 border-accent">Descripción</button>
            <button className="pb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Requerimientos</button>
            <button className="pb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Guía de Activación</button>
          </div>

          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold tracking-tighter uppercase italic text-white/90">Características <span className="text-accent">Premium</span></h3>
                <p className="text-white/40 leading-relaxed font-medium">
                  Este activo digital ha sido verificado bajo los estándares de calidad "WL-GOLD".
                  Garantiza acceso ilimitado a todas las funciones premium del software,
                  actualizaciones críticas de seguridad y soporte técnico de nivel concierge.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                  <Zap className="w-8 h-8 text-accent" />
                  <h5 className="text-[11px] font-bold uppercase tracking-widest">Velocidad Pro</h5>
                  <p className="text-[10px] text-white/30 leading-relaxed">Optimizado para un rendimiento máximo en cualquier entorno de trabajo.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                  <ShieldCheck className="w-8 h-8 text-accent" />
                  <h5 className="text-[11px] font-bold uppercase tracking-widest">Escudo de Datos</h5>
                  <p className="text-[10px] text-white/30 leading-relaxed">Privacidad integrada por diseño en cada módulo del software.</p>
                </div>
              </div>
            </div>

            {/* Package Snapshot */}
            <div className="p-12 rounded-[3.5rem] bg-white/[0.01] border border-white/5 space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Contenido del Paquete</h4>
              <ul className="space-y-6">
                {[
                  'Licencia Global Única (1 PC)',
                  'Certificado de Autenticidad Digital',
                  'Enlace de Descarga Directo VIP',
                  'Soporte Prioritario 24/7 Concierge',
                  'Guía Maestra de Configuración'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest group">
                    <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors">
                      <Check className="w-3 h-3 text-accent group-hover:text-white" />
                    </div>
                    <span className="text-white/40 group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

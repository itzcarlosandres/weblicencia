import { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Check, Star, ShieldCheck, Zap, Box, ShoppingCart } from 'lucide-react'
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
      <div className="py-32 px-4 min-h-screen flex items-center bg-[#050505] text-white">
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

  // Si no tiene imagen, usamos una por defecto o un placeholder premium
  const imageUrl = product.image || '/images/placeholders/product-placeholder.webp'

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link href="/products" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Regresar a Operaciones
        </Link>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Interactive Preview */}
          <div className="space-y-8">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-3xl group">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                  <Zap className="w-20 h-20 text-accent/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/10">Vista Previa No Disponible</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />

              <div className="absolute top-8 left-8">
                <Badge className="bg-accent text-black border-none px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-full shadow-2xl">
                  {(product as any).badge || 'Entrega Inmediata'}
                </Badge>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase text-white/20 tracking-widest">Seguridad</span>
                  <span className="text-[10px] font-bold uppercase">100% Original</span>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase text-white/20 tracking-widest">Velocidad</span>
                  <span className="text-[10px] font-bold uppercase">Envío Instantáneo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Asset Configuration */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] ml-1">{(product as any).categoryName || (product as any).category}</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-8">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
              <div className="flex items-center text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                Reseñas Verificadas (Gold Standard)
              </span>
            </div>

            <div className="space-y-8 mb-12 flex-1">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4 ml-1">Manifiesto del Activo</h3>
                <p className="text-lg text-white/50 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Valor de Adquisición</span>
                  <div className="text-5xl font-bold tracking-tighter">{formatPrice(product.price)}</div>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Reserva Disponible</span>
                  <div className="text-2xl font-bold text-white/60 tracking-tighter">{product.stock} Unidades</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <ProductDetailClient product={{
                ...product,
                price: Number(product.price)
              }} />
              <p className="text-center text-[9px] font-bold text-white/10 uppercase tracking-[0.2em]">
                Transacción asegurada por cifrado bancario de 256 bits
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-32 pt-24 border-t border-white/5">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <Check className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Activación Garantizada</h4>
              <p className="text-xs text-white/30 leading-relaxed font-medium">Todas nuestras claves son verificadas antes del envío para asegurar un funcionamiento al 100%.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Soporte Maestro 24/7</h4>
              <p className="text-xs text-white/30 leading-relaxed font-medium">Nuestro equipo de ingenieros está disponible para asistirte en el proceso de instalación.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Descarga Directa</h4>
              <p className="text-xs text-white/30 leading-relaxed font-medium">Accede a los enlaces oficiales de descarga inmediatamente después de confirmar tu pago.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Múltiples Pagos</h4>
              <p className="text-xs text-white/30 leading-relaxed font-medium">Aceptamos todos los medios de pago nacionales e internacionales con total seguridad.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { formatPrice, cn } from '@/lib/utils'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Zap, Monitor, Gamepad2, PlayCircle, Key, Filter, Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catálogo Premium | WebLicencia',
  description: 'Explora nuestra selección exclusia de licencias y activos digitales.',
}

const categoryIcons: Record<string, any> = {
  'Software': <Monitor className="w-4 h-4" />,
  'Juegos': <Gamepad2 className="w-4 h-4" />,
  'Suscripcion': <PlayCircle className="w-4 h-4" />,
  'Gift Cards': <Key className="w-4 h-4" />,
  'Default': <Zap className="w-4 h-4" />
}

async function getProducts(categoryName?: string) {
  return await prisma.product.findMany({
    where: {
      active: true,
      ...(categoryName ? { categoryName } : {})
    },
    orderBy: { createdAt: 'desc' }
  })
}

async function getCategories() {
  const categories = await (prisma as any).category.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  })
  return categories
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const products = await getProducts(searchParams.category)
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-4">
            <Badge className="bg-accent/10 text-accent border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
              Catálogo Maestro
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase">
              ACTIVOS <br /><span className="text-white/20">DIGITALES</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-right">
            <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Total en Inventario</span>
            <span className="text-5xl font-black text-white tracking-widest">{products.length}</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-3 mb-16 border-b border-white/5 pb-8">
          <Link href="/products">
            <button className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
              !searchParams.category
                ? "bg-white text-black border-white"
                : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:bg-white/10"
            )}>
              <Filter className="w-4 h-4" /> Todos
            </button>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.name}`}>
              <button className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                searchParams.category === cat.name
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:bg-white/10"
              )}>
                {categoryIcons[cat.name] || categoryIcons.Default}
                {cat.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          <Suspense fallback={<div className="col-span-full text-white/20 uppercase font-black text-center py-20">Sincronizando Bóveda...</div>}>
            {products.length === 0 ? (
              <div className="col-span-full py-32 text-center border border-dashed border-white/10 rounded-[3rem]">
                <Search className="w-16 h-16 text-white/5 mx-auto mb-6" />
                <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">No se encontraron activos en esta categoría</p>
              </div>
            ) : (
              products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group relative">
                  <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Card className="relative overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-3xl rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col group/card">
                    <CardContent className="p-0 flex-1 flex flex-col">
                      {/* Image Area */}
                      <div className="aspect-[4/3] relative bg-white/[0.02] flex items-center justify-center p-12 overflow-hidden border-b border-white/5">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <Zap className="w-16 h-16 text-white/5" />
                        )}
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-white text-black border-none px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg">
                            {(product as any).categoryName || (product as any).category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight line-clamp-2 leading-none group-hover/card:text-accent transition-colors">
                              {product.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                            ))}
                            <span className="text-[10px] font-bold text-white/20 ml-2 uppercase tracking-widest">Verificado</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Inversión Final</span>
                            <span className="text-2xl font-black text-white tracking-tighter">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-black transition-all duration-500">
                            <ShoppingCart className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

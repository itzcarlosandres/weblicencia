import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Zap } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { prisma } from '@/lib/prisma'

export async function TrendingProducts() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    take: 6
  })

  return (
    <section id="trending" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex items-end justify-between">
          <div className="space-y-4">
            <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block">Tendencias Globales</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tighter uppercase">
              Ofertas <span className="text-accent">Calientes</span>
            </h2>
          </div>
          <Link href="/products" className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-accent transition-colors pb-1 border-b border-white/5 hover:border-accent">
            Ver Todo el Catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const discount = Math.floor(Math.random() * 40) + 10;
            const originalPriceValue = Number(product.price) * (1 + discount / 100);

            return (
              <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] hover:border-accent/20 transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Zap className="w-12 h-12 text-white/5" />
                    </div>
                  )}

                  {/* Top-Left Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-white border-none px-3 py-1 text-[10px] font-bold rounded-full shadow-2xl">
                      -{discount}%
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 relative">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-accent transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Digital License</p>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 font-bold line-through tracking-tighter">
                        {formatPrice(originalPriceValue)}
                      </span>
                      <span className="text-2xl font-bold text-white tracking-tighter">
                        {formatPrice(Number(product.price))}
                      </span>
                    </div>

                    {/* Bottom-Right Floating Button */}
                    <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,123,255,0.3)] transform translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

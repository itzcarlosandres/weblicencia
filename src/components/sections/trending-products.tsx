import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Key, Globe, Zap, Monitor } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { prisma } from '@/lib/prisma'

export async function TrendingProducts() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    take: 6
  })

  return (
    <section id="trending" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#02040f]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
            Ofertas <span className="text-accent">Destacadas</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const discount = Math.floor(Math.random() * 40) + 60; // Simulación de descuento para el diseño
            const originalPrice = (Number(product.price) * (1 + discount / 100)).toFixed(2);

            return (
              <Link key={product.id} href={`/product/${product.slug}`} className="block group">
                <Card className="relative overflow-hidden border-none bg-[#0b0e22] group-hover:bg-[#111536] transition-all duration-300 flex h-48 rounded-xl shadow-2xl">
                  {/* Left: Product Image */}
                  <div className="w-40 h-full flex-shrink-0 relative overflow-hidden bg-white/5 p-2">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Zap className="w-8 h-8 text-white/5" />
                      </div>
                    )}

                    {/* Dynamic Badge */}
                    {(product as any).badge && (
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-accent text-black border-none px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-widest rounded-md shadow-xl">
                          {(product as any).badge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Right: Product Info */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                        {product.title}
                      </h3>

                      {/* Icons Row */}
                      <div className="flex items-center gap-3 py-2">
                        <Key className="w-3.5 h-3.5 text-orange-500" />
                        <Monitor className="w-3.5 h-3.5 text-blue-400" />
                        <Globe className="w-3.5 h-3.5 text-gray-400" />
                        <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 font-medium line-through">
                          FROM USD {originalPrice}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-white">
                            {formatPrice(product.price)}
                          </span>
                          <Badge className="bg-green-500/20 text-green-500 border-none px-1.5 py-0.5 text-[10px] font-bold rounded-md">
                            -{discount}%
                          </Badge>
                        </div>
                      </div>

                      <Button className="w-full bg-[#1e234a] group-hover:bg-accent text-white group-hover:text-black h-9 rounded-lg text-xs font-bold uppercase tracking-widest gap-2 transition-all border-none pointer-events-none">
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy now
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

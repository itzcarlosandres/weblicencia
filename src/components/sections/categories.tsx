'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  Laptop,
  Smartphone,
  Gamepad2,
  Music,
  Zap,
  Database,
  ArrowRight
} from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Software',
    icon: Laptop,
    count: '2.3K',
    href: '/products?category=software',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 2,
    name: 'Juegos',
    icon: Gamepad2,
    count: '5.1K',
    href: '/products?category=games',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 3,
    name: 'Móvil',
    icon: Smartphone,
    count: '1.2K',
    href: '/products?category=mobile',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 4,
    name: 'Streaming',
    icon: Music,
    count: '890',
    href: '/products?category=streaming',
    gradient: 'from-red-500/20 to-orange-500/20'
  },
  {
    id: 5,
    name: 'Herramientas',
    icon: Zap,
    count: '1.5K',
    href: '/products?category=tools',
    gradient: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    id: 6,
    name: 'VPS & Hosting',
    icon: Database,
    count: '620',
    href: '/products?category=hosting',
    gradient: 'from-indigo-500/20 to-blue-500/20'
  },
]

export function CategoriesSection() {
  return (
    <section id="categories" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-xs mb-4 block">Ecosistema Digital</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-white">
            Navega por <span className="text-accent">Categorías</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={category.href} className="group">
                <Card className="relative overflow-hidden border-border/5 bg-background/20 backdrop-blur-xl h-48 transition-all duration-500 group-hover:border-accent/30 group-hover:bg-background/40">
                  {/* Decorative Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-500 text-white group-hover:text-accent">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-white/10 group-hover:text-accent/20 transition-colors uppercase tracking-widest">{category.count}</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity">Productos</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <h3 className="text-2xl font-black text-white group-hover:translate-x-2 transition-transform duration-500">
                        {category.name}
                      </h3>
                      <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

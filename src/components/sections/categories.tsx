'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  Laptop,
  PlayCircle,
  CreditCard,
  Gamepad2,
  Zap,
  MessageSquare,
  Ghost,
  ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'

const defaultCategories = [
  {
    name: 'Software',
    icon: <Laptop className="w-10 h-10" />,
    href: '/products?category=Software',
    color: 'from-blue-500/10 to-transparent'
  },
  {
    name: 'Suscripcion',
    icon: <PlayCircle className="w-10 h-10" />,
    href: '/products?category=Suscripcion',
    color: 'from-red-500/10 to-transparent'
  },
  {
    name: 'Gift Cards',
    icon: <CreditCard className="w-10 h-10" />,
    href: '/products?category=Gift Cards',
    color: 'from-orange-500/10 to-transparent'
  },
  {
    name: 'Juegos',
    icon: <Gamepad2 className="w-10 h-10" />,
    href: '/products?category=Juegos',
    color: 'from-purple-500/10 to-transparent'
  },
  {
    name: 'AI Tools',
    icon: <Zap className="w-10 h-10" />,
    href: '/products?category=AI Tools',
    color: 'from-yellow-500/10 to-transparent'
  },
  {
    name: 'Playstation',
    icon: <Ghost className="w-10 h-10" />,
    href: '/products?category=Playstation',
    color: 'from-blue-600/10 to-transparent'
  },
  {
    name: 'Steam',
    icon: <MessageSquare className="w-10 h-10" />,
    href: '/products?category=Steam',
    color: 'from-gray-500/10 to-transparent'
  },
  {
    name: 'Seguridad',
    icon: <ShieldCheck className="w-10 h-10" />,
    href: '/products?category=Seguridad',
    color: 'from-green-500/10 to-transparent'
  }
]

export function CategoriesSection() {
  return (
    <section id="categories" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Ecosistema Digital</span>
          <h2 className="text-5xl font-black text-white leading-none tracking-tighter uppercase">
            Explora por <span className="text-white/20">Categoría</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 px-1">
          {defaultCategories.map((category, idx) => (
            <Link
              key={idx}
              href={category.href}
              className="group block"
            >
              <Card className="relative aspect-square overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 rounded-[2rem] group-hover:-translate-y-1">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  category.color
                )} />

                <CardContent className="p-0 h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-white/40 group-hover:text-accent transition-all duration-500 transform group-hover:scale-110">
                    {category.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white/40 group-hover:text-white transition-colors px-2">
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

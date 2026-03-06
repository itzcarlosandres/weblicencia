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
    <section id="categories" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 space-y-4">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block">Ecosistema Profesional</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tighter uppercase">
            Navega por <span className="text-white/20">Categoría</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16">
          {defaultCategories.slice(0, 6).map((category, idx) => (
            <Link
              key={idx}
              href={category.href}
              className="group flex flex-col items-center space-y-5"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/5 transition-all duration-700 group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(0,123,255,0.4)] group-hover:-translate-y-2">
                <div className="text-white/40 group-hover:text-white transition-colors duration-700 transform scale-75 md:scale-90 group-hover:scale-110">
                  {category.icon}
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-all duration-500 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

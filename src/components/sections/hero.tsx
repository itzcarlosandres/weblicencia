'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ShieldCheck, Sparkles, Zap, Timer } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-48 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* Advanced Lighting Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(0,123,255,0.15),transparent_60%)]" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[100%] bg-accent/10 blur-[160px] rounded-full opacity-60 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Lanzamientos Exclusivos 2024</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white uppercase">
              Desbloquea tu <br />
              Próxima <span className="text-accent underline decoration-accent/20 underline-offset-8">Aventura</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
              Tu portal de élite para licencias de software, códigos de juegos y activos digitales.
              Entrega instantánea, seguridad blindada.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/products">
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-accent text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_40px_rgba(0,123,255,0.3)] border-none group">
                Explorar Catálogo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Ofertas desde</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white tracking-tighter">$4.99</span>
                <Badge className="bg-green-500/20 text-green-500 border-none px-2 py-0.5 text-[10px] font-bold rounded-lg">+1k ventas hoy</Badge>
              </div>
            </div>
          </div>

          {/* Brands / Trust Row */}
          <div className="pt-12 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-widest">Verificado</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-widest">Instantáneo</span>
            </div>
            <div className="flex items-center gap-3">
              <Timer className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-widest">Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Graphic Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}

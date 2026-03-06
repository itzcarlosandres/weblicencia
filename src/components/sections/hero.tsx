'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ShieldCheck, Sparkles, Zap, Timer } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(circle_at_70%_30%,rgba(0,123,255,0.12),transparent_60%)] -z-10" />
      <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-accent/20 blur-[120px] rounded-full opacity-50 animate-pulse -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-10 relative z-10 text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Plataforma de Élite v2.0</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.85] text-white uppercase italic">
                EXPLORA <br />
                EL ADN <br />
                <span className="text-accent">DIGITAL</span>
              </h1>
              <p className="text-lg md:text-xl text-white/40 max-w-lg leading-relaxed font-medium">
                Adquiere licencias de software y códigos de juegos con seguridad de grado gubernamental.
                Entrega instantánea 24/7.
              </p>
            </div>

            {/* CTA Context */}
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <Link href="/products">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-accent text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-sm transition-all shadow-[0_20px_40px_rgba(0,123,255,0.3)] border-none group">
                  Ver Catálogo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-1">Ofertas desde</span>
                <span className="text-3xl font-bold text-white tracking-tighter underline decoration-white/10 underline-offset-4">$4.99 USD</span>
              </div>
            </div>

            {/* Micro Trust Row */}
            <div className="pt-12 flex items-center gap-8 opacity-20">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verificado</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Instantáneo</span>
              </div>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="relative group hidden lg:block">
            <div className="relative w-full aspect-square flex items-center justify-center p-12">
              {/* Outer Glows */}
              <div className="absolute inset-0 bg-accent/20 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-1000 animate-pulse" />

              {/* Central Shield Graphic */}
              <div className="relative w-full h-full border border-white/5 bg-white/[0.02] rounded-[5rem] flex items-center justify-center backdrop-blur-3xl group-hover:border-accent/30 transition-all duration-700 shadow-2xl">
                <Zap className="w-48 h-48 text-accent opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 animate-spin-slow" />

                {/* Floating Elements Mockup */}
                <div className="absolute -top-10 right-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-transparent blur-3xl" />
                <div className="absolute -bottom-10 left-10 w-40 h-40 bg-blue-500/10 blur-3xl" />

                {/* Floating Stat Widget */}
                <div className="absolute -bottom-4 -left-10 bg-white p-8 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.5)] transform -rotate-3 group-hover:rotate-0 transition-all duration-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Sistemas OK</span>
                  </div>
                  <p className="text-4xl font-bold text-black tracking-tighter italic">500,000+</p>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Clientes Satisfechos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

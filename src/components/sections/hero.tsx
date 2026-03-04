'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, Sparkles, Zap, Timer } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050505]">
      {/* Advanced Lighting Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,216,0.1),transparent_50%)]" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[100%] bg-accent/10 blur-[160px] rounded-full opacity-60 animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[100%] bg-primary/10 blur-[160px] rounded-full opacity-40" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Plataforma de Élite Digital</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                EL PODER <br />
                DEL <span className="text-accent">SOFTWARE</span> <br />
                INSTANTÁNEO
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                Adquiere licencias originales para profesionales y gamers. Entrega garantizada en menos de 60 segundos con seguridad de grado bancario.
              </p>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-tighter">Entrega</p>
                  <p className="text-xs text-muted-foreground">En tiempo real</p>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                  <Timer className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-tighter">Soporte</p>
                  <p className="text-xs text-muted-foreground">24/7 Priority</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/products">
                <Button size="lg" className="h-16 px-10 rounded-none bg-white text-black hover:bg-accent hover:text-white font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-white/10">
                  Explorar Ofertas
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-none border-white/10 hover:border-accent/40 bg-white/5 backdrop-blur-md text-white font-black uppercase tracking-widest text-sm transition-all">
                  Únete a la Élite
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual - Cinematic Image Container */}
          <div className="relative hidden lg:block perspective-1000">
            <div className="relative z-10 w-full aspect-square rotate-3 hover:rotate-0 transition-transform duration-1000 ease-out p-4">
              <div className="absolute inset-0 border-2 border-accent/20 rounded-[4rem] group" />
              <img
                src="/images/hero_visual.png"
                alt="Digital Power"
                className="w-full h-full object-cover rounded-[3.5rem] shadow-[0_0_80px_rgba(0,180,216,0.2)] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />

              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl animate-bounce-slow">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-black/50">Ventas en línea</span>
                </div>
                <p className="text-4xl font-black text-black tracking-tighter">542,102</p>
                <p className="text-xs font-bold text-accent uppercase tracking-wider">Licencias Despachadas</p>
              </div>
            </div>

            {/* Background glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/10 blur-[120px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

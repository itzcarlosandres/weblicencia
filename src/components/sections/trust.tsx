'use client'

import { Shield, Zap, HeadsetIcon, Fingerprint, Lock, Globe, Award, Heart } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Seguridad Blindada',
    description: 'Encriptación AES-256 bits en cada transacción. Tus datos son inaccesibles para terceros.',
    accent: 'text-blue-500'
  },
  {
    icon: Zap,
    title: 'Despacho Atómico',
    description: 'Infraestructura de servidor optimizada para entregar claves en milisegundos.',
    accent: 'text-accent'
  },
  {
    icon: HeadsetIcon,
    title: 'Soporte de Élite',
    description: 'Atención personalizada por ingenieros de soporte disponibles en cualquier zona horaria.',
    accent: 'text-purple-500'
  },
  {
    icon: Fingerprint,
    title: 'Legitimidad 100%',
    description: 'Cada licencia es verificada directamente con los proveedores oficiales antes de la entrega.',
    accent: 'text-green-500'
  },
]

export function TrustSection() {
  return (
    <section id="about" className="py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-accent/30 text-accent font-bold tracking-widest uppercase text-[10px] bg-accent/5 rounded-none">
            Estándar de Seguridad Global
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter text-white">
            Infraestructura de <span className="text-accent underline decoration-white/10 underline-offset-8">Confianza</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
            Hemos construido la plataforma más robusta del sector, priorizando la privacidad y la velocidad en cada paso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="group p-10 rounded-none border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-500">
                <div className="mb-8">
                  <div className={`w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent transition-all duration-500`}>
                    <Icon className={`h-7 w-7 ${feature.accent}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Global Stats or Proof Section */}
        <div className="mt-32 border-t border-white/5 pt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center items-center">
            <div className="space-y-2 group">
              <Lock className="w-8 h-8 text-white/20 mx-auto group-hover:text-accent transition-colors" />
              <p className="text-3xl font-bold text-white">PCI DSS</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Nivel de Seguridad</p>
            </div>
            <div className="space-y-2 group">
              <Globe className="w-8 h-8 text-white/20 mx-auto group-hover:text-accent transition-colors" />
              <p className="text-3xl font-bold text-white">124</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Países Cubiertos</p>
            </div>
            <div className="space-y-2 group">
              <Award className="w-8 h-8 text-white/20 mx-auto group-hover:text-accent transition-colors" />
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Originalidad</p>
            </div>
            <div className="space-y-2 group">
              <Heart className="w-8 h-8 text-white/20 mx-auto group-hover:text-accent transition-colors" />
              <p className="text-3xl font-bold text-white">A+</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Reputación VIP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Badge({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: string }) {
  return (
    <div className={`inline-block border px-2 py-0.5 text-xs font-semibold transition-colors ${className}`}>
      {children}
    </div>
  )
}

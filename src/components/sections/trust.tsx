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
    <section id="about" className="py-24 bg-background relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center space-y-4">
          <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] block">Estándar de Élite Digital</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tighter uppercase">
            Infraestructura de <span className="text-white/20">Confianza</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-16 md:gap-24">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-[2.5rem] bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-700 shadow-[0_0_30px_rgba(0,123,255,0.1)]">
              <Zap className="w-10 h-10 text-accent group-hover:text-white transition-colors duration-700" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">Entrega Instantánea</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs font-medium">
              Recibe tus claves digitales en menos de 60 segundos después de confirmar tu pago.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-[2.5rem] bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-700 shadow-[0_0_30px_rgba(0,123,255,0.1)]">
              <Shield className="w-10 h-10 text-accent group-hover:text-white transition-colors duration-700" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">Pagos Blindados</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs font-medium">
              La seguridad es nuestra prioridad. Utilizamos encriptación AES-256 en cada transacción.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-[2.5rem] bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-700 shadow-[0_0_30px_rgba(0,123,255,0.1)]">
              <HeadsetIcon className="w-10 h-10 text-accent group-hover:text-white transition-colors duration-700" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4 italic">Soporte Concierge</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs font-medium">
              Nuestro equipo VIP está disponible 24/7 para asistirte en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

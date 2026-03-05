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
        <div className="grid md:grid-cols-3 gap-16 md:gap-24">
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
              <Zap className="w-8 h-8 text-accent group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">Instant Delivery</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Receive your digital keys in less than 60 seconds after your payment is confirmed.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
              <Shield className="w-8 h-8 text-accent group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">Secure Payments</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Transaction security is our priority. We use high-level encryption for every purchase.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
              <HeadsetIcon className="w-8 h-8 text-accent group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4">24/7 Live Support</h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Our support team is online around the clock to assist you with any questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

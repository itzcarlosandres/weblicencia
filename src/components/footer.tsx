import Link from 'next/link'
import { Github, Twitter, Mail, Instagram, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* Branding */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-black fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tighter text-white">WebLicencia</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              La plataforma de élite para la adquisición de activos digitales, software profesional y entretenimiento de alta fidelidad.
            </p>
            <div className="flex space-x-5">
              {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                <Link key={i} href="#" className="text-white/30 hover:text-accent transition-colors">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-white mb-8">Ecosistema</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {['Licencias Pro', 'Códigos Digitales', 'Gift Cards VIP', 'Suscripciones'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-white mb-8">Asistencia</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {['Concierge Center', 'Canales VIP', 'Knowledge Base', 'SLA Status'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-white mb-8">Corporativo</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {['Términos de Élite', 'Privacidad Blindada', 'Cookies Policy', 'Legal Notice'].map(item => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <p>&copy; 2024 WEBLICENCIA GLOBAL HOLDINGS.</p>
            <span className="hidden md:inline">•</span>
            <p>ESTÁNDAR DE EXCELENCIA DIGITAL</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-500/50">Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

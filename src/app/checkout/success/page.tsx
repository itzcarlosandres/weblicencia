import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Zap, ShieldCheck, Mail, Smartphone } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Protocolo de Adquisición Exitoso | WebLicencia',
    description: 'Procesamiento de activos digitales verificado.',
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-white pt-24">
            <div className="max-w-3xl w-full">
                {/* Animated Cyber Result Container */}
                <div className="relative group">
                    {/* Background Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                    <div className="relative bg-[#080808] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl p-10 md:p-16 text-center space-y-12">

                        {/* Success Icon Section */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-28 h-28 rounded-[2rem] bg-green-500/10 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-[2rem] border-2 border-green-500/50 animate-ping opacity-20"></div>
                                <div className="w-20 h-20 rounded-2xl bg-green-500 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                    <Check className="w-12 h-12 text-black stroke-[3px]" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-center gap-3 text-green-500 mb-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">Transacción Verificada</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                    ORDEN <span className="text-white/20">COMPLETA</span>
                                </h1>
                                <p className="text-white/40 font-bold uppercase text-[10px] tracking-[0.2em] max-w-md mx-auto leading-loose">
                                    Su pago ha sido procesado por la infraestructura de seguridad. Los activos digitales se están sincronizando con su bóveda.
                                </p>
                            </div>
                        </div>

                        {/* Post-Purchase Intelligence Cards */}
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4 hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-3 text-accent">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Notificación de Entrega</span>
                                </div>
                                <p className="text-[11px] text-white/60 font-medium leading-relaxed">
                                    Un manifiesto detallado con sus claves ha sido enviado a su buzón de correo.
                                </p>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4 hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center gap-3 text-accent">
                                    <Zap className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Activación Inmediata</span>
                                </div>
                                <p className="text-[11px] text-white/60 font-medium leading-relaxed">
                                    Puede acceder a sus seriales directamente desde la sección de órdenes en su perfil.
                                </p>
                            </div>
                        </div>

                        {/* Final Actions */}
                        <div className="flex flex-col md:flex-row gap-4 pt-4">
                            <Link href="/dashboard/orders" className="flex-1">
                                <Button className="w-full h-20 bg-white hover:bg-green-500 text-black hover:text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-700 shadow-2xl group border-none">
                                    Gestionar Mis Licencias
                                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" className="w-full md:w-auto px-12 h-20 bg-transparent border-white/10 hover:bg-white/5 text-white/40 hover:text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all">
                                    Volver al Home
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Footer Identity */}
                <div className="mt-12 flex items-center justify-center gap-3 opacity-20">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-[0.6em]">WebLicencia High-Tech Delivery System</span>
                </div>
            </div>
        </div>
    )
}

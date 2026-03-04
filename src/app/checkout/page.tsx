import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CreditCard, Wallet, Lock, ShieldCheck, Zap, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
  title: 'Protocolo de Adquisición | WebLicencia',
  description: 'Finaliza tu transacción segura en la bóveda de licencias',
}

export default function CheckoutPage() {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/products" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Regresar a Operaciones
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-accent to-white bg-clip-text text-transparent uppercase tracking-tighter leading-none">
                PROTOCOL <span className="text-white/20">CHECKOUT</span>
              </h1>
              <div className="flex items-center gap-4">
                <Badge className="bg-accent/10 text-accent border-none px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full">
                  Conexión Encriptada SSL
                </Badge>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/40">
                  <Lock className="w-3 h-3" />
                  Bóveda Segura v2.0
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Billing Information Card */}
            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                <CardTitle className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  Identidad de Adquirente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Nombre Maestro</Label>
                    <Input placeholder="John Doe" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Correo Electrónico de Entrega</Label>
                    <Input type="email" placeholder="john@maestro.com" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Dirección de Residencia</Label>
                    <Input placeholder="Calle Principal 123" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Región / Ciudad</Label>
                    <Input placeholder="Bogotá" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Código Postal / Zip</Label>
                    <Input placeholder="110111" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-mono" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                <CardTitle className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                  Terminal de Pago
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="relative group cursor-pointer">
                    <input type="radio" name="payment" value="stripe" defaultChecked className="peer sr-only" />
                    <div className="h-24 p-6 border border-white/5 rounded-3xl bg-white/[0.01] peer-checked:border-accent peer-checked:bg-accent/5 transition-all flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-white/20 group-hover:text-accent group-peer-checked:text-accent" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Tarjeta de Crédito</span>
                        <span className="text-[8px] font-black uppercase text-white/20">Stripe Secure Pay</span>
                      </div>
                    </div>
                  </label>
                  <label className="relative group cursor-pointer">
                    <input type="radio" name="payment" value="paypal" className="peer sr-only" />
                    <div className="h-24 p-6 border border-white/5 rounded-3xl bg-white/[0.01] peer-checked:border-accent peer-checked:bg-accent/5 transition-all flex items-center gap-4">
                      <Wallet className="w-6 h-6 text-white/20 group-hover:text-accent group-peer-checked:text-accent" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Wallet Internacional</span>
                        <span className="text-[8px] font-black uppercase text-white/20">PayPal Gateway</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="space-y-8 pt-10 border-t border-white/5">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Identificador de Tarjeta</Label>
                    <Input placeholder="4111 1111 1111 1111" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Vencimiento</Label>
                      <Input placeholder="MM/YY" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-mono" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">CVC / Seguridad</Label>
                      <Input placeholder="123" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-mono" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Info Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden sticky top-32 shadow-2xl">
              <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Manifiesto de Pedido</CardTitle>
                <CardDescription className="text-[9px] font-black uppercase tracking-widest text-white/20">Resumen en tiempo real</CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center h-10 border-b border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Subtotal Operativo</span>
                    <span className="text-sm font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center h-10 border-b border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Impuestos / Fees</span>
                    <span className="text-sm font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Total de Adquisición</span>
                    <span className="text-4xl font-black text-white tracking-tighter">$0.00</span>
                  </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Transacción Segura</span>
                  </div>
                  <p className="text-[10px] font-medium leading-relaxed text-white/40 uppercase">
                    Su pago es procesado por capas de seguridad de grado militar. No almacenamos datos sensibles.
                  </p>
                </div>

                <Button className="w-full h-20 bg-white hover:bg-accent text-[#050505] hover:text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-500 shadow-2xl shadow-white/5 disabled:opacity-20 border-none" disabled>
                  Ejecutar Orden
                </Button>

                <p className="text-center text-[8px] font-black text-white/10 uppercase tracking-[0.2em] pt-4">
                  Al pulsar confirma aceptación de términos y licencias finales
                </p>
              </CardContent>
            </Card>

            {/* Certifications Card */}
            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden p-8 space-y-6 border border-white/5">
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">Garantía Gold</p>
                  <p className="text-[8px] font-medium text-white/30 truncate">Soporte Maestro Prioritario Incluido</p>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">Entrega Lightning</p>
                  <p className="text-[8px] font-medium text-white/30 truncate">Menos de 60 Segundos Post-Validación</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

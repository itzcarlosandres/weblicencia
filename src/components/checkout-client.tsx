'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CreditCard, Wallet, Lock, ShieldCheck, Zap, Star, Check, Loader2, Landmark, Trash2, Plus, Minus, Bitcoin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/hooks/use-cart'
import { formatPrice, cn } from '@/lib/utils'

export function CheckoutClient() {
    const router = useRouter()
    const { cart, subtotal, isLoaded, clearCart, removeFromCart, updateQuantity } = useCart()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'manual' | 'mercadopago' | 'coinpal'>('manual')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    })

    // Prevent hydration mismatch
    if (!isLoaded) return <div className="min-h-screen bg-black" />

    if (cart.length === 0 && !success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#050505] text-white">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8">
                    <Zap className="w-10 h-10 text-accent/20" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-center">Bóveda de Compra Vacía</h2>
                <p className="text-white/40 text-center mb-8 max-w-sm uppercase text-[10px] font-bold tracking-widest leading-loose">
                    No se han detectado activos en su sesión. Por favor, agregue productos al carrito para proceder.
                </p>
                <Link href="/products">
                    <Button className="bg-white text-black hover:bg-accent hover:text-white rounded-2xl h-16 px-12 font-bold uppercase tracking-widest text-[10px] transition-all border-none">
                        Explorar Catálogo
                    </Button>
                </Link>
            </div>
        )
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    total: subtotal,
                    paymentMethod,
                    customerInfo: formData
                })
            })

            if (response.ok) {
                const result = await response.json()

                if (result.redirectUrl) {
                    // Redirect to payment gateway if available
                    window.location.href = result.redirectUrl
                    return
                }

                setSuccess(true)
                clearCart()
                setTimeout(() => {
                    router.push('/dashboard/orders')
                }, 3000)
            } else {
                alert('Error al procesar la orden')
            }
        } catch (error) {
            console.error(error)
            alert('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505]">
                <div className="max-w-md w-full p-12 rounded-[3rem] bg-[#0b111b] border border-accent/20 shadow-2xl text-center space-y-8 animate-in fade-in zoom-in duration-700">
                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-3xl bg-accent/20 flex items-center justify-center animate-bounce">
                            <Check className="w-12 h-12 text-accent" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Orden Registrada</h2>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-loose">
                            Su solicitud ha sido enviada a la central de validación. {paymentMethod === 'manual' ? 'Por favor realice la transferencia y suba el comprobante si es necesario.' : ''}
                        </p>
                    </div>
                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] block mb-2">Estado de Seriales</span>
                        <Badge className="bg-yellow-500/10 text-yellow-500 border-none px-4 py-1 text-[9px] font-black uppercase">Pendiente de Aprobación</Badge>
                    </div>
                    <p className="text-[8px] font-black text-white/10 uppercase tracking-widest">Sincronizando con panel de usuario...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link href="/products" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Regresar a Operaciones
                    </Link>
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-accent to-white bg-clip-text text-transparent uppercase tracking-tighter leading-none">
                            PROTOCOL <span className="text-white/20">CHECKOUT</span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <Badge className="bg-accent/10 text-accent border-none px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full">
                                Conexión Encriptada SSL
                            </Badge>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Billing */}
                        <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <CardHeader className="p-10 border-b border-white/5">
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
                                        <Input name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Correo Electrónico de Entrega</Label>
                                        <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="john@maestro.com" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Dirección de Residencia</Label>
                                        <Input name="address" required value={formData.address} onChange={handleInputChange} placeholder="Calle Principal 123" className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Methods */}
                        <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <CardHeader className="p-10 border-b border-white/5">
                                <CardTitle className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-accent" />
                                    </div>
                                    Terminal de Pago
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-10 space-y-10">
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <label className="relative group cursor-pointer">
                                        <input type="radio" name="payment" value="manual" checked={paymentMethod === 'manual'} onChange={() => setPaymentMethod('manual')} className="peer sr-only" />
                                        <div className="h-full p-6 border border-white/5 rounded-3xl bg-white/[0.01] peer-checked:border-accent peer-checked:bg-accent/5 transition-all flex flex-col items-center text-center gap-4">
                                            <Landmark className="w-8 h-8 text-white/20 group-hover:text-accent group-peer-checked:text-accent" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Manual</span>
                                                <span className="text-[8px] font-black uppercase text-white/20">Transferencia</span>
                                            </div>
                                        </div>
                                    </label>

                                    <label className="relative group cursor-pointer">
                                        <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="peer sr-only" />
                                        <div className="h-full p-6 border border-white/5 rounded-3xl bg-white/[0.01] peer-checked:border-blue-400 peer-checked:bg-blue-400/5 transition-all flex flex-col items-center text-center gap-4">
                                            <Wallet className="w-8 h-8 text-white/20 group-hover:text-blue-400 group-peer-checked:text-blue-400" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">PayPal</span>
                                                <span className="text-[8px] font-black uppercase text-white/20">Billetera</span>
                                            </div>
                                        </div>
                                    </label>

                                    <label className="relative group cursor-pointer">
                                        <input type="radio" name="payment" value="mercadopago" checked={paymentMethod === 'mercadopago'} onChange={() => setPaymentMethod('mercadopago')} className="peer sr-only" />
                                        <div className="h-full p-6 border border-white/5 rounded-3xl bg-white/[0.01] peer-checked:border-sky-400 peer-checked:bg-sky-400/5 transition-all flex flex-col items-center text-center gap-4">
                                            <CreditCard className="w-8 h-8 text-white/20 group-hover:text-sky-400 group-peer-checked:text-sky-400" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">MercadoPago</span>
                                                <span className="text-[8px] font-black uppercase text-white/20">Tarjetas / Dinero</span>
                                            </div>
                                        </div>
                                    </label>

                                    <label className="relative group cursor-pointer">
                                        <input type="radio" name="payment" value="coinpal" checked={paymentMethod === 'coinpal'} onChange={() => setPaymentMethod('coinpal')} className="peer sr-only" />
                                        <div className="h-full p-6 border border-white/5 rounded-3xl bg-white/[0.01] peer-checked:border-orange-500 peer-checked:bg-orange-500/5 transition-all flex flex-col items-center text-center gap-4">
                                            <Bitcoin className="w-8 h-8 text-white/20 group-hover:text-orange-500 group-peer-checked:text-orange-500" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">CoinPal</span>
                                                <span className="text-[8px] font-black uppercase text-white/20">Crypto Gateway</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                {paymentMethod === 'manual' && (
                                    <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10 space-y-4 animate-in slide-in-from-top-2 duration-500">
                                        <span className="text-[10px] font-black text-accent uppercase tracking-widest">Instrucciones de Transferencia</span>
                                        <p className="text-[11px] font-medium leading-relaxed text-white/60">
                                            Realice el pago a la siguiente cuenta y su orden será aprobada manualmente por un administrador en menos de 24h.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-black/20 rounded-xl">
                                                <span className="text-[8px] font-black text-white/20 uppercase block uppercase tracking-widest mb-1">Banco / Plataforma</span>
                                                <span className="text-xs font-bold text-white">Bancolombia / Nequi</span>
                                            </div>
                                            <div className="p-4 bg-black/20 rounded-xl">
                                                <span className="text-[8px] font-black text-white/20 uppercase block uppercase tracking-widest mb-1">Número de Cuenta</span>
                                                <span className="text-xs font-bold text-white">300-1234567-8</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 h-fit sticky top-32">
                        <div className="space-y-6">
                            <Card className="border-white/5 bg-[#0b111b] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
                                <CardHeader className="p-8 border-b border-white/5">
                                    <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Manifiesto de Pedido</CardTitle>
                                    <CardDescription className="text-[9px] font-black uppercase tracking-widest text-white/20">Resumen en tiempo real</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {cart.map((item) => (
                                            <div key={item.id} className="group p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all space-y-3">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-white uppercase tracking-tight line-clamp-1">{item.title}</span>
                                                        <span className="text-[9px] font-bold text-accent uppercase tracking-widest mt-1">${item.price.toFixed(2)} / ud</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                                    <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
                                                        <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-white/5 text-white/40 rounded-lg"><Minus className="w-2.5 h-2.5" /></button>
                                                        <span className="text-[10px] font-bold text-white min-w-[12px] text-center">{item.quantity}</span>
                                                        <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white/5 text-white/40 rounded-lg"><Plus className="w-2.5 h-2.5" /></button>
                                                    </div>
                                                    <span className="text-xs font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Subtotal Operativo</span>
                                            <span className="text-sm font-bold">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4 border-t border-white/5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Total de Adquisición</span>
                                            <span className="text-4xl font-black text-white tracking-tighter">${subtotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-20 bg-white hover:bg-accent text-[#050505] hover:text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-500 shadow-2xl shadow-white/5 border-none"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Ejecutar Orden'}
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] p-8 space-y-6 border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Garantía Gold</p>
                                        <p className="text-[8px] font-medium text-white/30">Soporte Maestro Prioritario</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Entrega Lightning</p>
                                        <p className="text-[8px] font-medium text-white/30">Descarga Instantánea Post-Aprobación</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

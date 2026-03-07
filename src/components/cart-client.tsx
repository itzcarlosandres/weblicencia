'use client'

import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Zap, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export function CartClient() {
    const { cart, removeFromCart, updateQuantity, subtotal, isLoaded } = useCart()

    if (!isLoaded) return <div className="min-h-screen bg-black" />

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#050505] text-white">
                <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                    <ShoppingBag className="w-10 h-10 text-white/20" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-center">Bóveda Vacía</h2>
                <p className="text-white/40 text-center mb-10 max-w-sm uppercase text-[10px] font-bold tracking-widest leading-loose">
                    No has reservado ningún activo digital todavía. Explora nuestro catálogo premium para empezar.
                </p>
                <Link href="/products">
                    <Button className="bg-white text-black hover:bg-accent hover:text-white rounded-2xl h-16 px-12 font-black uppercase tracking-widest text-[10px] transition-all border-none">
                        Explorar Catálogo
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-accent mb-2">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Inventory System</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-accent to-white bg-clip-text text-transparent uppercase tracking-tighter leading-none">
                            MY <span className="text-white/10">CART</span>
                        </h1>
                    </div>
                    <Badge variant="outline" className="h-fit py-2 px-6 rounded-full border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
                        Total items: {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </Badge>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-6">
                        {cart.map((item) => (
                            <Card key={item.id} className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden group hover:border-accent/20 transition-all duration-500">
                                <CardContent className="p-8">
                                    <div className="flex flex-col sm:flex-row items-center gap-8">
                                        <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/5 bg-black/40 flex-shrink-0">
                                            <img src={item.image || '/images/placeholders/product-placeholder.webp'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>

                                        <div className="flex-1 space-y-4 text-center sm:text-left">
                                            <div>
                                                <h3 className="text-xl font-black text-white uppercase tracking-tight line-clamp-1">{item.title}</h3>
                                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Garantía WL-GOLD Activa</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
                                                <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 text-white/40 rounded-xl transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                                                    <span className="text-sm font-black text-white min-w-[24px] text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white/5 text-white/40 rounded-xl transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                                                </div>

                                                <span className="text-2xl font-black text-white tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-4 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="lg:col-span-4 h-fit sticky top-32">
                        <Card className="border-white/5 bg-[#0b111b] border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-2xl">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Checkout Summary</h3>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30">
                                        <span>Subtotal Operativo</span>
                                        <span className="text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-green-500/60">
                                        <span>Impuestos Digitales (0%)</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between items-center py-6 border-t border-white/10 mt-4">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Total General</span>
                                        <span className="text-5xl font-black text-white tracking-tighter font-sans">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full h-20 bg-white hover:bg-accent text-black hover:text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-700 shadow-2xl border-none">
                                    Proceder al Checkout
                                    <ArrowRight className="w-4 h-4 ml-3" />
                                </Button>
                            </Link>

                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                                <ShieldCheck className="w-6 h-6 text-accent opacity-50" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-white/20 leading-relaxed uppercase">
                                    Sección de seguridad maestra. Sus datos están encriptados mediante protocolo AES-256.
                                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

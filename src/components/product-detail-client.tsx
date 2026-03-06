'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Check, Loader2, ShoppingCart, ShieldCheck, Zap } from 'lucide-react'

import { useCart } from '@/hooks/use-cart'

export function ProductDetailClient({ product }: { product: any }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)

  const total = (product.price * quantity).toFixed(2)

  const handleBuyNow = async () => {
    setLoading(true)
    addToCart(product, quantity)
    await new Promise(resolve => setTimeout(resolve, 600))
    setPurchased(true)
    setLoading(false)
    setTimeout(() => router.push('/checkout'), 1200)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    // Optional: add a toast or feedback here
    alert('Añadido al carrito con éxito')
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + delta)))
  }

  if (purchased) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
        <div className="bg-[#0b111b] border border-white/10 rounded-[2.5rem] p-12 max-w-md w-full text-center space-y-8 shadow-2xl">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-accent" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Cifrado de Pedido Exitoso</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              {quantity} × {product.title}
            </p>
          </div>
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Redirigiendo a Pasarela Segura...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sidebar Purchase Card */}
      <div className="p-8 rounded-[2.5rem] bg-[#0b111b] border border-white/5 shadow-2xl space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Precio Maestro</span>
            <div className="bg-accent/10 text-accent border border-accent/20 rounded-lg px-2 py-0.5 text-[10px] font-bold">-20% OFF</div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tighter text-white">${Number(product.price).toFixed(2)}</span>
            <span className="text-sm font-bold text-white/20 line-through tracking-tighter">${(Number(product.price) * 1.2).toFixed(2)}</span>
          </div>
        </div>

        {/* Quantity Selector Inline */}
        <div className="flex items-center justify-between py-4 border-y border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Cantidad</span>
          <div className="flex items-center gap-4 bg-white/[0.03] p-1 rounded-xl border border-white/5">
            <button type="button" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-white/40 rounded-lg disabled:opacity-20"><Minus className="w-3 h-3" /></button>
            <span className="text-sm font-bold text-white w-4 text-center">{quantity}</span>
            <button type="button" onClick={() => handleQuantityChange(1)} disabled={quantity >= (product.stock || 100)} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-white/40 rounded-lg disabled:opacity-20"><Plus className="w-3 h-3" /></button>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleBuyNow}
            disabled={loading}
            className="w-full h-16 bg-accent hover:bg-white text-white hover:text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl shadow-accent/20 border-none group"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <span className="flex items-center gap-2">
                Adquirir Ahora
                <ShoppingCart className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleAddToCart}
            className="w-full h-16 rounded-2xl border-white/10 hover:border-accent/40 bg-white/5 text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
          >
            Añadir al Carrito
          </Button>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3 text-green-500">
            <Check className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">En Stock - Envío Atómico</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center gap-6 grayscale opacity-30">
            {/* Payment Icon Placeholders */}
            <div className="text-[8px] font-bold uppercase tracking-widest">VISA</div>
            <div className="text-[8px] font-bold uppercase tracking-widest">MASTER</div>
            <div className="text-[8px] font-bold uppercase tracking-widest">PYPL</div>
          </div>
        </div>
      </div>

      {/* Trust Mini Widget */}
      <div className="p-6 rounded-[2rem] bg-accent/5 border border-accent/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-accent" />
        </div>
        <p className="text-[9px] font-bold text-accent uppercase tracking-widest leading-relaxed">
          Protección total del comprador wl-gold. transacción verificada.
        </p>
      </div>
    </div>
  )
}

export default ProductDetailClient

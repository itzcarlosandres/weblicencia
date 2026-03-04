'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Check, Loader2, ShoppingCart } from 'lucide-react'

export function ProductDetailClient({ product }: { product: any }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)

  const total = (product.price * quantity).toFixed(2)

  const handleBuyNow = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setPurchased(true)
    setLoading(false)
    setTimeout(() => router.push('/checkout'), 1500)
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + delta)))
  }

  if (purchased) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
        <div className="bg-[#0b0e22] border border-white/10 rounded-[2.5rem] p-12 max-w-md w-full text-center space-y-8 shadow-2xl">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-accent" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Protocolo Iniciado</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              {quantity} × {product.title}
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-accent block mb-2">Total Operativo</span>
            <span className="text-3xl font-black text-white tracking-tighter">${total}</span>
          </div>
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Redirigiendo a Bóveda de Pago...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Unidades</span>
          <div className="flex items-center gap-4 bg-black/20 p-1 rounded-2xl border border-white/5">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="font-black text-white min-w-8 text-center text-lg">
              {quantity}
            </div>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Total Estimado</p>
          <p className="text-3xl font-black text-white tracking-tighter">${total}</p>
        </div>
      </div>

      {/* Purchase Button */}
      <Button
        onClick={handleBuyNow}
        disabled={loading}
        className="w-full h-20 bg-white hover:bg-accent text-[#050505] hover:text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-500 shadow-2xl shadow-white/5 border-none"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <span className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" />
            Iniciar Adquisición
          </span>
        )}
      </Button>

      {/* Trust Info */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 text-center">
        <div className="text-[8px] font-black uppercase tracking-widest text-white/20">
          🔒 Secure Pay
        </div>
        <div className="text-[8px] font-black uppercase tracking-widest text-white/20">
          ⚡ Instant key
        </div>
        <div className="text-[8px] font-black uppercase tracking-widest text-white/20">
          🎯 Top Tier
        </div>
      </div>
    </div>
  )
}

export default ProductDetailClient

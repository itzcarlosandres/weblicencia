import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Carrito de Compras',
  description: 'Tu carrito de WebLicencia',
}

export default function CartPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

        <div className="bg-muted border rounded-lg p-8 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Tu carrito está vacío
          </p>
          <Link href="/products">
            <Button size="lg">
              Continuar Comprando
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

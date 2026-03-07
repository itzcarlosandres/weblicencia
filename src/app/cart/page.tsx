import { Metadata } from 'next'
import { CartClient } from '@/components/cart-client'

export const metadata: Metadata = {
  title: 'Mi Bóveda de Compras | WebLicencia',
  description: 'Gestione sus activos digitales antes de la adquisición final.',
}

export default function CartPage() {
  return <CartClient />
}

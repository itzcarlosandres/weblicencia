import { Metadata } from 'next'
import { CheckoutClient } from '@/components/checkout-client'

export const metadata: Metadata = {
  title: 'Protocolo de Adquisición | WebLicencia',
  description: 'Finaliza tu transacción segura en la bóveda de licencias',
}

export default function CheckoutPage() {
  return <CheckoutClient />
}

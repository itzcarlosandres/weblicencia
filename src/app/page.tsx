import { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { HeroSection } from '@/components/sections/hero'
import { CategoriesSection } from '@/components/sections/categories'
import { TrendingProducts } from '@/components/sections/trending-products'
import { TrustSection } from '@/components/sections/trust'

import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Bienvenido a WebLicencia - Tu tienda premium de licencias, códigos y gift cards',
}

export default async function Home() {
  let config = null
  try {
    config = await (prisma as any).appConfig.findUnique({
      where: { id: 'global' }
    })
  } catch (error) {
    console.warn('AppConfig table not found')
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection config={config} />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Trust Section */}
      <TrustSection />
    </div>
  )
}

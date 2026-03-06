import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import { ClientLayout } from '@/components/client-layout'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'WebLicencia - Venta de Licencias Premium',
    template: '%s | WebLicencia',
  },
  description: 'Plataforma premium para comprar licencias de software, códigos digitales y gift cards de forma segura.',
  keywords: ['licencias', 'software', 'códigos', 'gift cards', 'compra segura'],
  authors: [{ name: 'WebLicencia' }],
  creator: 'WebLicencia',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'WebLicencia',
    title: 'WebLicencia - Venta de Licencias Premium',
    description: 'Plataforma premium para comprar licencias de software, códigos digitales y gift cards',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'WebLicencia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebLicencia - Venta de Licencias Premium',
    description: 'Plataforma premium para comprar licencias de software',
    creator: '@weblicencia',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body className={`${montserrat.variable} font-sans bg-background text-foreground`}>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

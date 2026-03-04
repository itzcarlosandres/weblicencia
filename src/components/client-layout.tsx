'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminPath = pathname?.startsWith('/admin')

    if (isAdminPath) {
        return <>{children}</>
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}

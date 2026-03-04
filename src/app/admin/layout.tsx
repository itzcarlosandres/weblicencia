'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AdminNav } from '@/components/admin/admin-nav'
import { Shield, Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        )
    }

    if (!session || (session.user as any)?.role !== 'ADMIN') {
        router.push('/login')
        return null
    }

    return (
        <div className="dark flex h-screen bg-[#050505] text-white overflow-hidden">
            {/* Sidebar Navigation */}
            <AdminNav />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md shrink-0">
                    <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-xl group focus-within:border-accent/40 transition-all">
                        <Search className="w-4 h-4 text-white/40 group-focus-within:text-accent" />
                        <input
                            type="text"
                            placeholder="Buscar transacción, producto o usuario..."
                            className="bg-transparent border-none focus:ring-0 text-xs font-medium w-64 ml-3 placeholder:text-white/20"
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <Button size="icon" variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-[#050505]" />
                        </div>

                        <div className="flex items-center space-x-4 bg-white/5 border border-white/10 pl-4 pr-2 py-1.5 rounded-2xl">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">{session.user?.name}</span>
                                <span className="text-[8px] font-bold text-accent uppercase tracking-[0.2em] leading-none mt-1">Status: Online</span>
                            </div>
                            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-black font-black text-xs shadow-lg shadow-accent/20">
                                {session.user?.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

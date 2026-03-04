'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Package,
    Key,
    ShoppingBag,
    Users,
    BarChart3,
    Settings,
    Shield,
    ExternalLink,
    ChevronRight
} from 'lucide-react'

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Productos', icon: Package },
    { href: '/admin/keys', label: 'Licencias', icon: Key },
    { href: '/admin/orders', label: 'Pedidos', icon: ShoppingBag },
    { href: '/admin/users', label: 'Usuarios', icon: Users },
    { href: '/admin/reports', label: 'Reportes', icon: BarChart3 },
    { href: '/admin/settings', label: 'Configuración', icon: Settings },
]

export function AdminNav() {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-3xl h-full flex flex-col pt-8">
            <div className="px-6 mb-12">
                <Link href="/admin" className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                        <Shield className="w-5 h-5 text-black fill-current" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-sm tracking-tighter text-white uppercase">Control Central</span>
                        <span className="text-[9px] font-bold text-accent uppercase tracking-widest leading-none">Administrador</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                                isActive
                                    ? "bg-accent/10 border border-accent/20 text-accent"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div className="flex items-center space-x-3">
                                <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-accent" : "group-hover:text-white")} />
                                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4" />}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 mt-auto">
                <Link href="/" target="_blank">
                    <button className="w-full h-12 border border-white/5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded-xl">
                        <ExternalLink className="w-3 h-3" />
                        Ver Sitio Web
                    </button>
                </Link>
            </div>
        </aside>
    )
}

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    formatPrice,
    formatDate,
    getStatusColor
} from '@/lib/utils'
import {
    updateOrderStatus
} from '@/app/admin/actions'
import {
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    ChevronDown,
    User,
    Package,
    CreditCard,
    Calendar,
    Search,
    MoreHorizontal
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'

interface OrderListProps {
    initialOrders: any[]
}

export function OrderListClient({ initialOrders }: OrderListProps) {
    const [orders, setOrders] = useState(initialOrders)
    const [searchTerm, setSearchTerm] = useState('')
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        setLoadingId(orderId)
        const result = await updateOrderStatus(orderId, newStatus)
        setLoadingId(null)

        if (result.success) {
            setOrders(prev =>
                prev.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            )
        } else {
            alert('Error: ' + result.error)
        }
    }

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Search and Filters */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                <Input
                    placeholder="BUSCAR POR ID, CLIENTE O EMAIL..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/[0.02] border-white/5 h-20 rounded-[1.5rem] pl-16 pr-8 font-black uppercase tracking-[0.2em] text-[10px] focus:border-accent/40 transition-all shadow-2xl"
                />
            </div>

            <div className="grid gap-6">
                {filteredOrders.map((order) => (
                    <Card key={order.id} className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden group hover:border-accent/20 transition-all duration-500 shadow-2xl">
                        <CardContent className="p-0">
                            <div className="grid lg:grid-cols-12 items-center">
                                {/* ID & Status */}
                                <div className="lg:col-span-3 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]">
                                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] block mb-2">Orden #</span>
                                    <div className="flex flex-col gap-4">
                                        <span className="text-xs font-black text-white uppercase font-mono">{order.id.slice(0, 12)}...</span>
                                        <Badge className={`${getStatusColor(order.status)} border-none py-1.5 px-4 text-[9px] font-black uppercase tracking-widest w-fit`}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="lg:col-span-6 p-8 lg:p-10 grid md:grid-cols-3 gap-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-white/20">
                                            <User className="w-3.5 h-3.5" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Cliente</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white uppercase">{order.user.name}</p>
                                            <p className="text-[9px] font-bold text-white/30 truncate">{order.user.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-white/20">
                                            <CreditCard className="w-3.5 h-3.5" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Monto / Pago</span>
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-accent tracking-tighter">{formatPrice(order.total)}</p>
                                            <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{order.paymentMethod || 'Manual'}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-white/20">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Fecha Apertura</span>
                                        </div>
                                        <p className="text-[10px] font-black text-white uppercase">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="lg:col-span-3 p-8 lg:p-10 flex lg:justify-end items-center gap-4 bg-white/[0.01] border-t lg:border-t-0 lg:border-l border-white/5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                disabled={loadingId === order.id}
                                                className="bg-white/5 hover:bg-accent hover:text-white border border-white/10 rounded-2xl h-14 px-8 text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                {loadingId === order.id ? <Clock className="w-4 h-4 animate-spin" /> : 'Acciones'}
                                                <ChevronDown className="ml-2 w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#0b111b] border-white/10 text-white rounded-2xl p-2 w-56">
                                            <DropdownMenuLabel className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 p-3">Cambiar Estado</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(order.id, 'PAID')}
                                                className="rounded-xl p-3 focus:bg-green-500/10 focus:text-green-500 cursor-pointer text-[10px] font-bold uppercase"
                                            >
                                                <CheckCircle2 className="mr-2 w-4 h-4" /> Aprobar Pago
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(order.id, 'FAILED')}
                                                className="rounded-xl p-3 focus:bg-red-500/10 focus:text-red-500 cursor-pointer text-[10px] font-bold uppercase"
                                            >
                                                <XCircle className="mr-2 w-4 h-4" /> Marcar Fallido
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(order.id, 'PENDING')}
                                                className="rounded-xl p-3 focus:bg-yellow-500/10 focus:text-yellow-500 cursor-pointer text-[10px] font-bold uppercase"
                                            >
                                                <Clock className="mr-2 w-4 h-4" /> Poner en Espera
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-white/5" />
                                            <DropdownMenuItem className="rounded-xl p-3 focus:bg-white/10 cursor-pointer text-[10px] font-bold uppercase">
                                                <ExternalLink className="mr-2 w-4 h-4" /> Ver Detalles
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredOrders.length === 0 && (
                <div className="py-24 text-center space-y-4">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl mx-auto flex items-center justify-center">
                        <Search className="w-8 h-8 text-white/20" />
                    </div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">No se encontraron registros</p>
                </div>
            )}
        </div>
    )
}

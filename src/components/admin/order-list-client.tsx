'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
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
    Eye,
    ArrowRight,
    ShieldCheck,
    Zap,
    Tag,
    Hash,
    Smartphone,
    Mail,
    MapPin
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

interface OrderListProps {
    initialOrders: any[]
}

export function OrderListClient({ initialOrders }: OrderListProps) {
    const [orders, setOrders] = useState(initialOrders)
    const [searchTerm, setSearchTerm] = useState('')
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

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
            // Update selected order if it's open
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }))
            }
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
        <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Dynamic Search Bar */}
            <div className="relative group max-w-2xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-blue-500/50 rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
                <div className="relative">
                    <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                    <Input
                        placeholder="BUSCAR EN LA RED DE ÓRDENES..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-black border-white/10 h-20 rounded-[1.8rem] pl-16 pr-8 font-black uppercase tracking-[0.3em] text-xs focus:ring-0 focus:border-accent text-white transition-all placeholder:text-white/10"
                    />
                </div>
            </div>

            <div className="grid gap-8">
                {filteredOrders.map((order) => (
                    <Card key={order.id} className="border-white/5 bg-[#080808] hover:bg-[#0c0c0c] rounded-[3rem] overflow-hidden group transition-all duration-700 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.05)] border-l-4 border-l-transparent hover:border-l-accent">
                        <CardContent className="p-0">
                            <div className="grid lg:grid-cols-12 items-center">
                                {/* Protocol ID & Status */}
                                <div className="lg:col-span-3 p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]">
                                    <div className="flex items-center gap-2 text-white/10 mb-3">
                                        <Hash className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Protocolo ID</span>
                                    </div>
                                    <div className="space-y-6">
                                        <span className="text-sm font-black text-white uppercase font-mono tracking-tight block">...{order.id.slice(-12)}</span>
                                        <Badge className={`${getStatusColor(order.status)} border-none py-2.5 px-6 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl`}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Data Grid */}
                                <div className="lg:col-span-6 p-10 lg:p-12 grid md:grid-cols-3 gap-10">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-white/20">
                                            <User className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Adquirente</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase tracking-tight mb-1">{order.user.name}</p>
                                            <p className="text-[10px] font-bold text-accent/60 truncate">{order.user.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-white/20">
                                            <Zap className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Liquidación</span>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-white tracking-tighter mb-1">{formatPrice(order.total)}</p>
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-3 h-3 text-white/20" />
                                                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{order.paymentMethod || 'Sistema Manual'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-white/20">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Operación</span>
                                        </div>
                                        <p className="text-[11px] font-black text-white/60 uppercase">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>

                                {/* Commands Terminal - ALWAYS VISIBLE BUTTON */}
                                <div className="lg:col-span-3 p-10 lg:p-12 flex lg:justify-end items-center gap-4 bg-white/[0.01] border-t lg:border-t-0 lg:border-l border-white/5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                disabled={loadingId === order.id}
                                                className="bg-accent hover:bg-white text-white hover:text-black border-none rounded-[1.2rem] h-16 w-full lg:w-48 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl shadow-accent/20 flex items-center justify-center gap-3 active:scale-95 group"
                                            >
                                                {loadingId === order.id ? <Clock className="w-4 h-4 animate-spin" /> : (
                                                    <>
                                                        <Tag className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                        Acciones
                                                    </>
                                                )}
                                                <ChevronDown className="w-4 h-4 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#0c0c0c] border-white/5 text-white rounded-[1.5rem] p-3 w-72 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl animate-in zoom-in-95 duration-200">
                                            <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 p-4 border-b border-white/5 mb-2">Comandos del Administrador</DropdownMenuLabel>

                                            <DropdownMenuItem
                                                onClick={() => setSelectedOrder(order)}
                                                className="rounded-xl p-5 focus:bg-accent focus:text-white cursor-pointer text-[11px] font-black uppercase tracking-wider flex items-center justify-between group transition-all"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Eye className="w-4 h-4" /> Ver Detalles
                                                </div>
                                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator className="bg-white/5 my-2" />

                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(order.id, 'PAID')}
                                                className="rounded-xl p-5 focus:bg-green-500/10 focus:text-green-500 cursor-pointer text-[10px] font-black uppercase tracking-wider flex items-center gap-4 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                                                Aprobar Pago
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(order.id, 'FAILED')}
                                                className="rounded-xl p-5 focus:bg-red-500/10 focus:text-red-500 cursor-pointer text-[10px] font-black uppercase tracking-wider flex items-center gap-4 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><XCircle className="w-4 h-4" /></div>
                                                Marcar Fallida
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => handleStatusUpdate(order.id, 'PENDING')}
                                                className="rounded-xl p-5 focus:bg-yellow-500/10 focus:text-yellow-500 cursor-pointer text-[10px] font-black uppercase tracking-wider flex items-center gap-4 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center"><Clock className="w-4 h-4" /></div>
                                                En Revisión
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Futuristic Details Terminal */}
            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="bg-[#080808] border-white/5 text-white max-w-3xl rounded-[3.5rem] p-0 overflow-hidden shadow-[0_0_100px_rgba(var(--accent-rgb),0.1)]">
                    {selectedOrder && (
                        <div className="flex flex-col">
                            {/* Cyber Header */}
                            <div className="p-12 bg-white/[0.02] border-b border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                                    <ShieldCheck size={200} />
                                </div>
                                <DialogHeader className="relative z-10">
                                    <div className="flex items-center gap-3 text-accent mb-6">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">Terminal de Validación Maestra</span>
                                    </div>
                                    <DialogTitle className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                                        Protocolo <span className="text-white/20 font-mono tracking-tight">#{selectedOrder.id.slice(-8)}</span>
                                    </DialogTitle>
                                    <div className="flex items-center gap-6">
                                        <Badge className={`${getStatusColor(selectedOrder.status)} border-none py-2 px-5 text-[9px] font-black uppercase tracking-widest rounded-full`}>
                                            {selectedOrder.status}
                                        </Badge>
                                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{formatDate(selectedOrder.createdAt)}</span>
                                    </div>
                                </DialogHeader>
                            </div>

                            {/* Grid Layout Body */}
                            <div className="p-12 grid md:grid-cols-2 gap-12 bg-[#080808]">
                                {/* Left: Client & Payment */}
                                <div className="space-y-10">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-white/20">
                                            <User className="w-4 h-4" />
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Identidad del Adquirente</h4>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 bg-white/[0.02] p-5 rounded-3xl border border-white/5">
                                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent font-black">
                                                    {selectedOrder.user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white uppercase tracking-tight">{selectedOrder.user.name}</p>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 truncate">
                                                        <Mail className="w-3 h-3" /> {selectedOrder.user.email}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 px-5 text-white/20 h-10">
                                                <MapPin className="w-3 h-3" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Localización: Sincronizada</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-white/20">
                                            <CreditCard className="w-4 h-4" />
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Resumen de Liquidación</h4>
                                        </div>
                                        <div className="bg-accent/5 border border-accent/20 p-8 rounded-[2.5rem] space-y-4">
                                            <div className="flex justify-between items-center text-white/40">
                                                <span className="text-[10px] font-black uppercase tracking-widest">Base Imponible</span>
                                                <span className="text-xs font-bold font-mono">{formatPrice(selectedOrder.total)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-accent pt-4 border-t border-accent/20">
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Total Final</span>
                                                <span className="text-3xl font-black tracking-tighter">{formatPrice(selectedOrder.total)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Items */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between text-white/20">
                                        <div className="flex items-center gap-3">
                                            <Package className="w-4 h-4" />
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Activos Digitales</h4>
                                        </div>
                                        <span className="text-[9px] font-black tracking-widest">[{selectedOrder.items.length}] ÍTEMS</span>
                                    </div>
                                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedOrder.items.map((item: any) => (
                                            <div key={item.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-accent/50 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform"><Zap className="w-4 h-4" /></div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-white uppercase tracking-tight">{item.product.title}</p>
                                                        <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Cat: Software</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-accent">{formatPrice(item.price)}</p>
                                                    <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Cant {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Action Bar */}
                            <div className="p-10 bg-white/[0.01] border-t border-white/5 flex gap-4">
                                <Button
                                    onClick={() => handleStatusUpdate(selectedOrder.id, 'PAID')}
                                    className="flex-1 h-20 bg-accent hover:bg-white text-white hover:text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-[1.5rem] transition-all duration-500 border-none shadow-2xl shadow-accent/20"
                                >
                                    AUTORIZAR LICENCIAS
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedOrder(null)}
                                    className="h-20 px-10 bg-transparent border-white/10 hover:bg-white/5 text-white/20 hover:text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-[1.5rem] transition-all"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

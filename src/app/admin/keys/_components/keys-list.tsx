'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Search, Edit2, Trash2, Check, X, Shield, Lock, Unlock, Filter } from 'lucide-react'
import { updateLicenseKey, deleteLicenseKey } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface KeysListProps {
    keys: {
        id: string
        key: string
        status: string
        product: { title: string }
        createdAt: Date
    }[]
}

export function KeysList({ keys }: KeysListProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editValue, setEditValue] = useState('')
    const [loading, setLoading] = useState<string | null>(null)
    const router = useRouter()

    const filteredKeys = keys.filter(k =>
        k.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleUpdate = async (id: string) => {
        if (!editValue) return
        setLoading(id)
        const result = await updateLicenseKey(id, { key: editValue })
        if (result.success) {
            toast({ title: "Actualizado", description: "La clave ha sido modificada." })
            setEditingId(null)
            router.refresh()
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" })
        }
        setLoading(null)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que quieres eliminar esta clave permanentemente?')) return
        setLoading(id)
        const result = await deleteLicenseKey(id)
        if (result.success) {
            toast({ title: "Eliminado", description: "Clave borrada de la bóveda." })
            router.refresh()
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" })
        }
        setLoading(null)
    }

    const toggleEditing = (id: string, value: string) => {
        if (editingId === id) {
            setEditingId(null)
        } else {
            setEditingId(id)
            setEditValue(value)
        }
    }

    return (
        <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white/40" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">Inventario de Bóveda</CardTitle>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Monitoreo de Activos Activos</p>
                        </div>
                    </div>
                    <div className="relative md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <Input
                            placeholder="Buscar clave o producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/[0.03] border-white/10 h-12 rounded-xl pl-12 pr-4 focus:border-accent/50 transition-all font-medium text-xs text-white"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-white/[0.01] border-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/30 h-14 pl-8">Activo Digital</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/30 h-14">Producto Vinculado</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/30 h-14">Estado</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-white/30 h-14 text-right pr-8">Operaciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredKeys.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-32 text-center text-[10px] font-black uppercase tracking-widest text-white/10">
                                    No se encontraron registros en la base de datos
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredKeys.map((k) => (
                                <TableRow key={k.id} className="border-white/5 hover:bg-white/[0.01] transition-colors group">
                                    <TableCell className="pl-8 py-6">
                                        {editingId === k.id ? (
                                            <div className="flex gap-2">
                                                <Input
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="bg-white/5 border-white/10 h-10 rounded-lg font-mono text-xs text-accent"
                                                />
                                                <Button size="icon" variant="ghost" onClick={() => handleUpdate(k.id)} disabled={loading === k.id} className="h-10 w-10 text-green-500 hover:bg-green-500/10">
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => setEditingId(null)} className="h-10 w-10 text-red-500 hover:bg-red-500/10">
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" />
                                                <span className="font-mono text-xs text-white/80 select-all">{k.key}</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-white/60 uppercase tracking-tight">{k.product.title}</span>
                                            <span className="text-[8px] font-bold text-white/10 uppercase tracking-tighter">ID: {k.id.slice(0, 8)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn(
                                            "border-none px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full",
                                            k.status === 'AVAILABLE' ? "bg-green-500/10 text-green-500" :
                                                k.status === 'SOLD' ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                                        )}>
                                            {k.status === 'AVAILABLE' ? <Unlock className="w-3 h-3 mr-1 inline" /> : <Lock className="w-3 h-3 mr-1 inline" />}
                                            {k.status === 'AVAILABLE' ? 'Libre' : k.status === 'SOLD' ? 'Desplegada' : 'Revocada'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => toggleEditing(k.id, k.key)}
                                                className="h-9 w-9 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(k.id)}
                                                disabled={loading === k.id}
                                                className="h-9 w-9 rounded-xl bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

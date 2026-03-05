'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { upsertCategory } from '@/app/admin/actions'
import { useToast } from '@/components/ui/use-toast'

interface CategoryFormProps {
    children: React.ReactNode
    category?: any
}

export function CategoryForm({ children, category }: CategoryFormProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const icon = formData.get('icon') as string
        const order = parseInt(formData.get('order') as string || '0')

        const result = await upsertCategory({
            id: category?.id,
            name,
            icon,
            order,
            active: true
        })

        setLoading(false)
        if (result.success) {
            toast({ title: '✓ Éxito', description: 'Categoría guardada correctamente' })
            setOpen(false)
        } else {
            toast({
                title: '✕ Error',
                description: result.error || 'No se pudo guardar la categoría',
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-[#0a0a0a] border-white/5 text-white rounded-[2rem] max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                        {category ? 'Editar' : 'Nueva'} Categoría
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Nombre de Categoría</Label>
                        <Input
                            name="name"
                            defaultValue={category?.name}
                            required
                            className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-accent/40"
                            placeholder="Ej: Software, Juegos. (GitCard - Gift Cards)"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Icono (Lucide name)</Label>
                            <Input
                                name="icon"
                                defaultValue={category?.icon}
                                className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-accent/40"
                                placeholder="Ej: Laptop, Gamepad"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Orden</Label>
                            <Input
                                name="order"
                                type="number"
                                defaultValue={category?.order || 0}
                                className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-accent/40"
                            />
                        </div>
                    </div>

                    <Button
                        disabled={loading}
                        className="w-full bg-accent text-black hover:bg-white h-12 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-accent/20 transition-all"
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

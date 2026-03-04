'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteProduct } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface DeleteProductButtonProps {
    id: string
}

export function DeleteProductButton({ id }: DeleteProductButtonProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de que deseas desactivar este producto?')) return

        setLoading(true)
        try {
            await deleteProduct(id)
            toast({
                title: "Producto desactivado",
                description: "El producto ya no será visible en la tienda.",
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo desactivar el producto.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </Button>
    )
}

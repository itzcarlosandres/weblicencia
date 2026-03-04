'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { upsertProduct } from '../../actions'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Loader2, Save, X, Image as ImageIcon, UploadCloud } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { slugify } from '@/lib/utils'

const ProductSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    slug: z.string().min(3, 'El slug es requerido'),
    description: z.string().min(10, 'La descripción debe ser más detallada'),
    price: z.coerce.number().positive('El precio debe ser positivo'),
    category: z.string().min(1, 'La categoría es requerida'),
    stock: z.coerce.number().int().nonnegative(),
    image: z.string().optional(),
    badge: z.string().optional(),
    active: z.boolean().default(true),
})

type ProductFormValues = z.infer<typeof ProductSchema>

interface ProductFormProps {
    initialData?: any
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: initialData || {
            active: true,
            stock: 0
        }
    })

    const isActive = watch('active')
    const imageUrl = watch('image')
    const title = watch('title')

    useEffect(() => {
        setValue('slug', slugify(title || ''))
    }, [title, setValue])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setValue('image', reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setValue('image', reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const onSubmit = async (data: ProductFormValues) => {
        setLoading(true)
        try {
            const result = await upsertProduct(data)
            if (result.success) {
                toast({
                    title: "¡Éxito!",
                    description: `Producto ${initialData ? 'actualizado' : 'creado'} correctamente.`,
                })
                router.push('/admin/products')
                router.refresh()
            } else {
                toast({
                    title: "Error de Servidor",
                    description: result.error || "Hubo un problema al guardar el producto.",
                    variant: "destructive"
                })
            }
        } catch (error: any) {
            toast({
                title: "Error de Red",
                description: error.message || "No se pudo conectar con el servidor.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-accent to-white bg-clip-text text-transparent uppercase tracking-tighter leading-none">
                        {initialData ? 'Refinar' : 'Forjar'} <span className="text-white/20">Producto</span>
                    </h1>
                    <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Configuración de Activo Digital v4.0</p>
                </div>
                <div className="flex gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()} className="border border-white/10 text-white hover:text-white hover:border-white/40 hover:bg-white/5 rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[10px] transition-all bg-transparent">
                        <X className="w-4 h-4 mr-2" />
                        Abortar
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-white text-[#050505] hover:bg-accent hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-14 px-10 shadow-2xl shadow-white/5 transition-all border-none">
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        {initialData ? 'Sincronizar Cambios' : 'Desplegar Producto'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-3xl overflow-hidden">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
                            <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Arquitectura de Información</CardTitle>
                            {watch('badge') && (
                                <Badge className="bg-accent text-black border-none text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                    {watch('badge')}
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2 col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Título de Exhibición</Label>
                                    <Input {...register('title')} placeholder="Ej: Windows 11 Enterprise LTSC" className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all placeholder:text-white/10 font-bold" />
                                    {errors.title && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2 ml-1">{errors.title.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Badge / Etiqueta</Label>
                                    <Input {...register('badge')} placeholder="OFERTA -60%" className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all font-black text-accent text-[10px]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Identificador Slug (Automático)</Label>
                                    <Input {...register('slug')} placeholder="windows-11-ent-ltsc" className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all font-mono text-xs text-white/40" tabIndex={-1} readOnly />
                                    {errors.slug && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2 ml-1">{errors.slug.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Clasificación / Categoría</Label>
                                    <Input {...register('category')} placeholder="Sistemas Operativos" className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold" />
                                    {errors.category && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2 ml-1">{errors.category.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Manifiesto del Producto (Descripción)</Label>
                                <Textarea {...register('description')} rows={6} placeholder="Escribe las especificaciones técnicas y beneficios..." className="bg-white/[0.03] border-white/10 rounded-2xl p-6 focus:border-accent/50 transition-all resize-none leading-relaxed font-medium" />
                                {errors.description && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2 ml-1">{errors.description.message}</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-3xl overflow-hidden">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
                            <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Gestión de Inventario Crítico</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Valor Unitario (USD)</Label>
                                <Input type="number" {...register('price')} placeholder="59000" className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all text-accent font-black text-xl" />
                                {errors.price && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2 ml-1">{errors.price.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Capacidad de Reserva</Label>
                                <Input type="number" {...register('stock')} className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all font-mono font-bold" />
                                {errors.stock && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2 ml-1">{errors.stock.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-3xl overflow-hidden">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01]">
                            <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Visibilidad</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                                <div className="space-y-0.5">
                                    <Label className="text-xs font-black uppercase tracking-widest text-white">Estado Activo</Label>
                                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">Público en Catálogo</p>
                                </div>
                                <Switch
                                    checked={isActive}
                                    onCheckedChange={(val) => setValue('active', val)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-3xl overflow-hidden">
                        <CardHeader className="p-8 border-b border-white/5 bg-white/[0.01] flex flex-row items-center justify-between">
                            <CardTitle className="text-xl font-black text-white uppercase tracking-tight">Identidad Visual</CardTitle>
                            <Badge className="bg-accent/10 text-accent border-none text-[8px] font-black uppercase tracking-widest">Premium Asset</Badge>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Zona de Despliegue de Imagen</Label>

                                {watch('image') ? (
                                    <div className="relative group rounded-3xl overflow-hidden border border-white/10 aspect-video bg-white/5 shadow-2xl">
                                        <img src={watch('image')} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <div className="flex gap-4">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-white hover:text-accent font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Cambiar Asset
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => setValue('image', '')}
                                                    className="text-white hover:text-red-500 font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        onDrop={onDrop}
                                        onDragOver={onDragOver}
                                        className="border-2 border-dashed border-white/10 rounded-3xl aspect-video flex flex-col items-center justify-center space-y-4 bg-white/[0.01] hover:bg-white/[0.03] hover:border-accent/40 transition-all cursor-pointer group"
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <UploadCloud className="w-8 h-8 text-white/20 group-hover:text-accent transition-colors" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white">Vincular Recurso Gráfico</p>
                                            <p className="text-[8px] font-bold text-white/20 uppercase tracking-tighter mt-1">Haz click o arrastra una imagen aquí</p>
                                        </div>
                                    </div>
                                )}

                                {!watch('image')?.startsWith('data:') && (
                                    <div className="pt-4">
                                        <div className="relative">
                                            <Input
                                                {...register('image')}
                                                placeholder="https://tu-bucket.com/assets/producto.webp"
                                                className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all text-[11px] font-mono placeholder:text-white/5"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <Save className="w-4 h-4 text-white/10" />
                                            </div>
                                        </div>
                                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mt-3 ml-2">Pega la URL del servidor de medios arriba</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}

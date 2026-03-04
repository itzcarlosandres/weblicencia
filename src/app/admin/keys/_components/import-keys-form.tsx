'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Plus, Trash2, Database, Zap, Key } from 'lucide-react'
import { importLicenseKeys } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface ImportKeysFormProps {
    products: { id: string, title: string }[]
}

export function ImportKeysForm({ products }: ImportKeysFormProps) {
    const [loading, setLoading] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<string>('')
    const [manualKeys, setManualKeys] = useState<string[]>([''])
    const router = useRouter()

    const handleImport = async (text: string, productId: string) => {
        setLoading(true)
        try {
            const result = await importLicenseKeys(text, productId)
            if (result.success) {
                toast({
                    title: "¡Bóveda Actualizada!",
                    description: `Integradas: ${result.importedCount}${result.duplicateCount > 0 ? ` | Ignoradas (Duplicadas): ${result.duplicateCount}` : ''}`,
                })
                setManualKeys([''])
                router.refresh()
            } else {
                toast({
                    title: "Fallo en Bóveda",
                    description: result.error || "No se pudieron inyectar las claves.",
                    variant: "destructive"
                })
            }
        } catch (error: any) {
            toast({
                title: "Error de Sistema",
                description: error.message || "Error al procesar la carga de claves.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const addKeyField = () => setManualKeys([...manualKeys, ''])
    const updateKeyField = (index: number, value: string) => {
        const newKeys = [...manualKeys]
        newKeys[index] = value
        setManualKeys(newKeys)
    }
    const removeKeyField = (index: number) => {
        if (manualKeys.length > 1) {
            setManualKeys(manualKeys.filter((_, i) => i !== index))
        }
    }

    const handleManualSubmit = () => {
        const keysText = manualKeys.filter(k => k.trim()).join('\n')
        if (!keysText) {
            toast({ title: "Advertencia", description: "Ingresa al menos una clave." })
            return
        }
        if (!selectedProductId) {
            toast({ title: "Advertencia", description: "Debes seleccionar un producto para la carga." })
            return
        }
        handleImport(keysText, selectedProductId)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                            <Key className="w-7 h-7 text-accent" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-black text-white uppercase tracking-tight leading-none">Inyección de Claves</CardTitle>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-2">Carga Manual de Activos Digitales</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Producto Destino</Label>
                        <div className="relative">
                            <select
                                value={selectedProductId}
                                onChange={(e) => setSelectedProductId(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all text-white font-bold appearance-none cursor-pointer outline-none"
                            >
                                <option value="" className="bg-[#050505]">Selecciona un Producto Master</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id} className="bg-[#050505]">{p.title}</option>
                                ))}
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                                <Database className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Claves de Acceso (Línea por Línea)</Label>
                        <div className="border border-white/10 bg-white/[0.01] rounded-[2rem] p-8 space-y-6">
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {manualKeys.map((key, index) => (
                                    <div key={index} className="flex gap-3 group/field">
                                        <div className="relative flex-1">
                                            <Input
                                                value={key}
                                                onChange={(e) => updateKeyField(index, e.target.value)}
                                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                                className="bg-white/[0.03] border-white/10 h-14 rounded-2xl px-6 focus:border-accent/50 transition-all font-mono text-xs placeholder:text-white/5"
                                            />
                                            <Zap className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/5 group-hover/field:text-accent/20 transition-colors" />
                                        </div>
                                        {manualKeys.length > 1 && (
                                            <Button
                                                onClick={() => removeKeyField(index)}
                                                variant="ghost"
                                                className="h-14 w-14 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white p-0 transition-all border border-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 grid grid-cols-2 gap-4">
                                <Button
                                    onClick={addKeyField}
                                    variant="ghost"
                                    className="border border-dashed border-white/10 text-white/40 hover:text-white hover:border-white/40 rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] transition-all"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Añadir Slot
                                </Button>
                                <Button
                                    onClick={handleManualSubmit}
                                    disabled={loading || !selectedProductId}
                                    className="bg-white text-black hover:bg-accent hover:text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all border-none"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Inyectar Claves"}
                                </Button>
                            </div>

                            {!selectedProductId && (
                                <p className="text-[9px] font-black text-red-500/50 uppercase text-center tracking-widest">Requiere Selección de Producto</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

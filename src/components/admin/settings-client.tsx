'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateAppConfig } from '@/app/admin/actions'
import { Loader2, Save, Layout, Sliders, AlertCircle } from 'lucide-react'

interface SettingsClientProps {
    initialConfig: {
        heroTitle: string
        heroSubtitle: string
        heroOffersFrom: string
    } | null
}

export function SettingsClient({ initialConfig }: SettingsClientProps) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [config, setConfig] = useState({
        heroTitle: initialConfig?.heroTitle || 'EL ESTÁNDAR DE ÉLITE EN LICENCIAS DIGITALES',
        heroSubtitle: initialConfig?.heroSubtitle || 'INFRAESTRUCTURA PREMIUM',
        heroOffersFrom: initialConfig?.heroOffersFrom || '29.99'
    })

    const handleSaveHero = async () => {
        setLoading(true)
        setMessage(null)
        const result = await updateAppConfig(config)
        setLoading(false)

        if (result.success) {
            setMessage({ type: 'success', text: 'Configuración de Hero actualizada' })
        } else {
            setMessage({ type: 'error', text: result.error || 'Error al guardar' })
        }
    }

    return (
        <div className="space-y-8">
            {message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">{message.text}</span>
                </div>
            )}

            {/* Hero Content Settings */}
            <Card className="border-white/5 bg-white/[0.02] shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                            <Layout className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">Personalización Hero</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/20">Control visual de la sección principal</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Título Principal (Hero Title)</Label>
                            <Input
                                value={config.heroTitle}
                                onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                                className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold uppercase"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Subtítulo (Hero Subtitle)</Label>
                            <Input
                                value={config.heroSubtitle}
                                onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                                className="bg-white/[0.03] border-white/10 h-16 rounded-2xl px-6 focus:border-accent/50 transition-all font-bold uppercase"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Ofertas Desde (Precio Gancho)</Label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-bold">$</span>
                                <Input
                                    value={config.heroOffersFrom}
                                    onChange={(e) => setConfig({ ...config, heroOffersFrom: e.target.value })}
                                    className="bg-white/[0.03] border-white/10 h-16 rounded-2xl pl-10 pr-6 focus:border-accent/50 transition-all font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleSaveHero}
                        disabled={loading}
                        className="w-full h-16 bg-accent hover:bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl shadow-accent/20 border-none group"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <span className="flex items-center gap-2">
                                Actualizar Sección Hero
                                <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </span>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Other Settings (Disabled for now as per current UI) */}
            <Card className="border-white/5 bg-white/[0.02] shadow-2xl rounded-[2.5rem] opacity-40">
                <CardHeader className="p-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Sliders className="w-6 h-6 text-white/20" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">Parámetros Globales</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/10">Configuraciones de sistema restringidas</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

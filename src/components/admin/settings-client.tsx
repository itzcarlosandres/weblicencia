'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateAppConfig } from '@/app/admin/actions'
import { Loader2, Save, Layout, Sliders, AlertCircle, CreditCard, DollarSign, Bitcoin, ShieldCheck } from 'lucide-react'

interface SettingsClientProps {
    initialConfig: {
        heroTitle: string
        heroSubtitle: string
        heroOffersFrom: string
        heroTitleSize: string
        paypalClientId?: string | null
        paypalSecret?: string | null
        mercadopagoAccessToken?: string | null
        coinpalApiKey?: string | null
        coinpalMerchantId?: string | null
    } | null
}

export function SettingsClient({ initialConfig }: SettingsClientProps) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [config, setConfig] = useState({
        heroTitle: initialConfig?.heroTitle || 'EL ESTÁNDAR DE ÉLITE EN LICENCIAS DIGITALES',
        heroSubtitle: initialConfig?.heroSubtitle || 'INFRAESTRUCTURA PREMIUM',
        heroOffersFrom: initialConfig?.heroOffersFrom || '29.99',
        heroTitleSize: initialConfig?.heroTitleSize || '8xl',
        paypalClientId: initialConfig?.paypalClientId || '',
        paypalSecret: initialConfig?.paypalSecret || '',
        mercadopagoAccessToken: initialConfig?.mercadopagoAccessToken || '',
        coinpalApiKey: initialConfig?.coinpalApiKey || '',
        coinpalMerchantId: initialConfig?.coinpalMerchantId || ''
    })

    const handleSave = async (sectionName: string) => {
        setLoading(true)
        setMessage(null)
        const result = await updateAppConfig(config)
        setLoading(false)

        if (result.success) {
            setMessage({ type: 'success', text: `Configuración de ${sectionName} actualizada correctamente` })
        } else {
            setMessage({ type: 'error', text: result.error || 'Error al guardar configuración' })
        }
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-1000 pb-24">
            {message && (
                <div className={`p-6 rounded-3xl flex items-center justify-between gap-4 sticky top-8 z-50 backdrop-blur-3xl shadow-2xl border ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                    <div className="flex items-center gap-4">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">{message.text}</span>
                    </div>
                    <button onClick={() => setMessage(null)} className="text-[10px] font-black uppercase opacity-50 hover:opacity-100">Cerrar</button>
                </div>
            )}

            {/* Hero Content Settings */}
            <Card className="border-white/5 bg-white/[0.01] shadow-2xl rounded-[3.5rem] overflow-hidden group">
                <CardHeader className="p-10 md:p-14 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Layout className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-black text-white uppercase tracking-tighter">Interfaz Hero</CardTitle>
                            <CardDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Parámetros de impacto visual principal</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10 md:p-14 space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Título Primario</Label>
                            <Input
                                value={config.heroTitle}
                                onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                                className="bg-white/[0.02] border-white/10 h-16 rounded-2xl px-6 focus:border-accent transition-all font-black uppercase text-xs"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Subtítulo Descriptivo</Label>
                            <Input
                                value={config.heroSubtitle}
                                onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                                className="bg-white/[0.02] border-white/10 h-16 rounded-2xl px-6 focus:border-accent transition-all font-black uppercase text-xs"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Precio de Entrada (USD)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-accent w-4 h-4" />
                                <Input
                                    value={config.heroOffersFrom}
                                    onChange={(e) => setConfig({ ...config, heroOffersFrom: e.target.value })}
                                    className="bg-white/[0.02] border-white/10 h-16 rounded-2xl pl-12 pr-6 focus:border-accent transition-all font-mono text-xs"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Escala Tipográfica</Label>
                            <select
                                value={config.heroTitleSize}
                                onChange={(e) => setConfig({ ...config, heroTitleSize: e.target.value })}
                                className="w-full bg-white/[0.02] border border-white/10 h-16 rounded-2xl px-6 focus:border-accent transition-all font-black text-xs text-white uppercase outline-none appearance-none cursor-pointer"
                            >
                                <option value="6xl" className="bg-[#050505]">6XL - Estándar</option>
                                <option value="7xl" className="bg-[#050505]">7XL - Moderado</option>
                                <option value="8xl" className="bg-[#050505]">8XL - Gran Impacto</option>
                                <option value="9xl" className="bg-[#050505]">9XL - Máximo</option>
                            </select>
                        </div>
                    </div>

                    <Button
                        onClick={() => handleSave('Hero')}
                        disabled={loading}
                        className="w-full h-20 bg-white text-black hover:bg-accent hover:text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-700 shadow-2xl border-none group"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                            <span className="flex items-center gap-3">
                                <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Validar y Guardar Cambios Hero
                            </span>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Payment Systems Configuration */}
            <Card className="border-white/5 bg-white/[0.01] shadow-2xl rounded-[3.5rem] overflow-hidden group">
                <CardHeader className="p-10 md:p-14 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <CreditCard className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-black text-white uppercase tracking-tighter">Pasarelas de Pago</CardTitle>
                            <CardDescription className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Integración de APIs y credenciales financieras</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10 md:p-14 space-y-12">
                    {/* PayPal */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 text-blue-400">
                            <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center font-black italic text-xs">PP</div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">PayPal Business Gateway</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Client ID</Label>
                                <Input
                                    type="password"
                                    value={config.paypalClientId}
                                    onChange={(e) => setConfig({ ...config, paypalClientId: e.target.value })}
                                    placeholder="Ingrese su Client ID de PayPal"
                                    className="bg-white/[0.02] border-white/10 h-16 rounded-2xl px-6 focus:border-blue-400 transition-all font-mono text-xs"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Secret Key</Label>
                                <Input
                                    type="password"
                                    value={config.paypalSecret}
                                    onChange={(e) => setConfig({ ...config, paypalSecret: e.target.value })}
                                    placeholder="Ingrese su Secret de PayPal"
                                    className="bg-white/[0.02] border-white/10 h-16 rounded-2xl px-6 focus:border-blue-400 transition-all font-mono text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Mercado Pago */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 text-sky-400">
                            <div className="w-8 h-8 rounded-lg bg-sky-400/10 flex items-center justify-center font-black text-xs">MP</div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Mercado Pago API (MercadoLibre)</h4>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Access Token</Label>
                            <Input
                                type="password"
                                value={config.mercadopagoAccessToken}
                                onChange={(e) => setConfig({ ...config, mercadopagoAccessToken: e.target.value })}
                                placeholder="APP_USR-..."
                                className="bg-white/[0.02] border-white/10 h-16 rounded-2xl px-6 focus:border-sky-400 transition-all font-mono text-xs"
                            />
                        </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* CoinPal */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 text-orange-500">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center"><Bitcoin className="w-4 h-4" /></div>
                            <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">CoinPal Crypto Payment</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">API Key</Label>
                                <Input
                                    type="password"
                                    value={config.coinpalApiKey}
                                    onChange={(e) => setConfig({ ...config, coinpalApiKey: e.target.value })}
                                    placeholder="CoinPal API Key"
                                    className="bg-white/[0.02] border-white/10 h-16 rounded-2xl px-6 focus:border-orange-500 transition-all font-mono text-xs"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Merchant ID</Label>
                                <Input
                                    value={config.coinpalMerchantId}
                                    onChange={(e) => setConfig({ ...config, coinpalMerchantId: e.target.value })}
                                    placeholder="ID Comerciante"
                                    className="bg-white/[0.02] border-white/10 h-16 rounded-2xl px-6 focus:border-orange-500 transition-all font-mono text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => handleSave('Sistemas de Pago')}
                        disabled={loading}
                        className="w-full h-20 bg-green-500 hover:bg-green-400 text-black rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-700 shadow-[0_0_50px_rgba(34,197,94,0.1)] border-none group"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                            <span className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 group-hover:scale-125 transition-transform duration-500" />
                                Vincular Pasarelas Maestro
                            </span>
                        )}
                    </Button>
                </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2 opacity-20 hover:opacity-100 transition-opacity pb-12">
                <Sliders className="w-4 h-4" />
                <span className="text-[8px] font-black uppercase tracking-[0.5em]">WebLicencia v2.0 Enterprise Configuration</span>
            </div>
        </div>
    )
}

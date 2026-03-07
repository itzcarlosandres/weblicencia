import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
        return NextResponse.redirect(new URL('/checkout/error', request.url))
    }

    try {
        const baseUrl = process.env.NEXTAUTH_URL || `${request.nextUrl.protocol}//${request.nextUrl.host}`

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { product: true } } }
        })

        const config = await (prisma as any).appConfig.findUnique({
            where: { id: 'global' }
        })

        if (!order || !config?.mercadopagoAccessToken) {
            return NextResponse.redirect(new URL('/checkout/error', baseUrl))
        }

        // --- MERCADO PAGO REAL INTEGRATION ---
        const response = await fetch('https://api.mercadopago.com/v1/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.mercadopagoAccessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: order.items.map((item: any) => ({
                    title: item.product.title,
                    unit_price: item.price,
                    quantity: item.quantity,
                    currency_id: 'USD'
                })),
                back_urls: {
                    success: `${baseUrl}/checkout/success`,
                    failure: `${baseUrl}/checkout/error`,
                    pending: `${baseUrl}/dashboard/orders`
                },
                auto_return: 'approved',
                external_reference: order.id
            })
        })

        const preference = await response.json()

        if (preference.init_point) {
            return NextResponse.redirect(preference.init_point)
        } else {
            console.error('MP Preference Error:', preference)
            return NextResponse.redirect(new URL('/checkout/error', baseUrl))
        }

    } catch (error) {
        const baseUrl = process.env.NEXTAUTH_URL || `${request.nextUrl.protocol}//${request.nextUrl.host}`
        console.error('MP Setup Error:', error)
        return NextResponse.redirect(new URL('/checkout/error', baseUrl))
    }
}

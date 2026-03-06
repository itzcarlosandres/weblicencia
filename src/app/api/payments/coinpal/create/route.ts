import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
        return NextResponse.redirect(new URL('/checkout/error', request.url))
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        })

        const config = await (prisma as any).appConfig.findUnique({
            where: { id: 'global' }
        })

        if (!order || !config?.coinpalApiKey || !config?.coinpalMerchantId) {
            return NextResponse.redirect(new URL('/checkout/error', request.url))
        }

        // --- COINPAL REAL INTEGRATION ---

        // Prepare request to CoinPal (Assuming standard REST endpoint)
        const response = await fetch('https://api.coinpal.io/v1/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': config.coinpalApiKey
            },
            body: JSON.stringify({
                merchantId: config.coinpalMerchantId,
                orderId: order.id,
                amount: order.total,
                currency: 'USD',
                successUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/checkout/success`,
                cancelUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/checkout/error`
            })
        })

        const result = await response.json()

        if (result.paymentUrl) {
            return NextResponse.redirect(new URL(result.paymentUrl, request.url))
        } else {
            console.error('CoinPal API Error:', result)
            return NextResponse.redirect(new URL('/checkout/error', request.url))
        }

    } catch (error) {
        console.error('CoinPal Setup Error:', error)
        return NextResponse.redirect(new URL('/checkout/error', request.url))
    }
}

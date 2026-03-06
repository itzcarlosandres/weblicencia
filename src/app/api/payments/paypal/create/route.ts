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

        if (!order || !config?.paypalClientId || !config?.paypalSecret) {
            return NextResponse.redirect(new URL('/checkout/error', request.url))
        }

        // --- PAYPAL REAL INTEGRATION ---

        // 1. Get Access Token
        const auth = Buffer.from(`${config.paypalClientId}:${config.paypalSecret}`).toString('base64')
        const tokenResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        })

        const tokenData = await tokenResponse.json()
        const accessToken = tokenData.access_token

        if (!accessToken) {
            console.error('PayPal Token Error:', tokenData)
            return NextResponse.redirect(new URL('/checkout/error', request.url))
        }

        // 2. Create Order
        const orderResponse = await fetch('https://api-m.paypal.com/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    reference_id: order.id,
                    amount: {
                        currency_code: 'USD',
                        value: order.total.toFixed(2)
                    }
                }],
                application_context: {
                    return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/checkout/success`,
                    cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/checkout/error`
                }
            })
        })

        const paypalOrder = await orderResponse.json()
        const approveLink = paypalOrder.links?.find((l: any) => l.rel === 'approve')?.href

        if (approveLink) {
            return NextResponse.redirect(new URL(approveLink, request.url))
        } else {
            console.error('PayPal Order Error:', paypalOrder)
            return NextResponse.redirect(new URL('/checkout/error', request.url))
        }

    } catch (error) {
        console.error('PayPal Setup Error:', error)
        return NextResponse.redirect(new URL('/checkout/error', request.url))
    }
}

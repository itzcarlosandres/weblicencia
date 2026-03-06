import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const { items, total, paymentMethod, customerInfo } = await request.json()

        // Fetch Config to get Payment Keys
        const config = await (prisma as any).appConfig.findUnique({
            where: { id: 'global' }
        })

        // Validate data
        if (!items || items.length === 0 || !total) {
            return NextResponse.json({ message: 'El carrito está vacío' }, { status: 400 })
        }

        // Determine user ID
        let userId = (session?.user as any)?.id

        // If no session, find user by email or create a temporary one if needed
        // For now, let's assume they MUST be logged in for a better experience, 
        // or we find them by email from the customerInfo
        if (!userId) {
            const existingUser = await prisma.user.findUnique({
                where: { email: customerInfo.email }
            })

            if (existingUser) {
                userId = existingUser.id
            } else {
                // Create user without password (can be set later)
                const newUser = await prisma.user.create({
                    data: {
                        name: customerInfo.name,
                        email: customerInfo.email,
                        role: 'CUSTOMER'
                    }
                })
                userId = newUser.id
            }
        }

        // Create the order
        const order = await prisma.order.create({
            data: {
                userId: userId as string,
                total: parseFloat(total),
                status: 'PENDING',
                paymentMethod: paymentMethod,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        price: parseFloat(item.price),
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                items: true
            }
        })

        // Generate Payment Response based on Provider
        let redirectUrl = null

        if (paymentMethod === 'paypal' && config?.paypalClientId) {
            // Here you would normally integrate the PayPal SDK
            // For now we assume the client handle the return
            redirectUrl = `/api/payments/paypal/create?orderId=${order.id}`
        } else if (paymentMethod === 'mercadopago' && config?.mercadopagoAccessToken) {
            redirectUrl = `/api/payments/mercadopago/create?orderId=${order.id}`
        } else if (paymentMethod === 'coinpal' && config?.coinpalApiKey) {
            redirectUrl = `/api/payments/coinpal/create?orderId=${order.id}`
        }

        return NextResponse.json({
            message: 'Orden creada exitosamente',
            orderId: order.id,
            redirectUrl
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json({ message: 'Error al procesar la orden' }, { status: 500 })
    }
}

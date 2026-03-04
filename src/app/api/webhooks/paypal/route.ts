import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    // PayPal webhook events
    // https://developer.paypal.com/api/webhooks/event-types/

    switch (event.event_type) {
      case 'CHECKOUT.ORDER.COMPLETED': {
        const orderData = event.resource

        console.log('PayPal Order Completed:', orderData.id)

        // Find the order by paymentId
        const order = await prisma.order.findFirst({
          where: { paymentId: orderData.id },
          include: { items: { include: { product: true } } },
        })

        if (order) {
          // Update order status to PAID
          await prisma.order.update({
            where: { id: order.id },
            data: {
              status: 'PAID',
              paymentMethod: 'paypal',
            },
          })

          // Assign license keys
          for (const item of order.items) {
            for (let i = 0; i < item.quantity; i++) {
              const availableKey = await prisma.licenseKey.findFirst({
                where: {
                  productId: item.productId,
                  status: 'AVAILABLE',
                },
              })

              if (availableKey) {
                await prisma.licenseKey.update({
                  where: { id: availableKey.id },
                  data: {
                    status: 'SOLD',
                    orderId: order.id,
                  },
                })
              }
            }
          }

          console.log(`Order ${order.id} marked as PAID and keys assigned`)
        }
        break
      }

      case 'CHECKOUT.ORDER.APPROVED': {
        console.log('PayPal Order Approved:', event.resource.id)
        break
      }

      case 'PAYMENT.CAPTURE.COMPLETED': {
        console.log('PayPal Payment Capture Completed:', event.resource.id)
        break
      }

      case 'PAYMENT.CAPTURE.DENIED': {
        const captureId = event.resource.id
        console.log('PayPal Payment Capture Denied:', captureId)

        // Find and update related order
        const orders = await prisma.order.findMany({
          where: { paymentId: captureId },
        })

        for (const order of orders) {
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'FAILED' },
          })
        }
        break
      }

      default:
        console.log(`Unhandled PayPal event type: ${event.event_type}`)
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('PayPal webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

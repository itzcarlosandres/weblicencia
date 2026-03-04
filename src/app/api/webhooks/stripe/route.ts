import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment Intent Succeeded:', paymentIntent.id)

        // Update order status to PAID
        if (paymentIntent.metadata.orderId) {
          const order = await prisma.order.findUnique({
            where: { id: paymentIntent.metadata.orderId },
            include: { items: { include: { product: true } } },
          })

          if (order) {
            // Update order status
            await prisma.order.update({
              where: { id: order.id },
              data: {
                status: 'PAID',
                paymentId: paymentIntent.id,
                paymentMethod: 'stripe',
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
        }
        break
      }

      case 'charge.failed': {
        const charge = event.data.object as Stripe.Charge
        console.log('Charge Failed:', charge.id)

        // Find and update related order
        if (charge.payment_intent) {
          const orders = await prisma.order.findMany({
            where: { paymentId: charge.payment_intent.toString() },
          })

          for (const order of orders) {
            await prisma.order.update({
              where: { id: order.id },
              data: { status: 'FAILED' },
            })
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (err) {
    console.error('Error processing webhook:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true })
}

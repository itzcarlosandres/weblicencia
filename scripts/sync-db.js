const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Attempting to manually sync database columns...')
    try {
        // Add columns to app_configs table
        await prisma.$executeRawUnsafe(`ALTER TABLE "app_configs" ADD COLUMN IF NOT EXISTS "paypalClientId" TEXT;`)
        await prisma.$executeRawUnsafe(`ALTER TABLE "app_configs" ADD COLUMN IF NOT EXISTS "paypalSecret" TEXT;`)
        await prisma.$executeRawUnsafe(`ALTER TABLE "app_configs" ADD COLUMN IF NOT EXISTS "mercadopagoAccessToken" TEXT;`)
        await prisma.$executeRawUnsafe(`ALTER TABLE "app_configs" ADD COLUMN IF NOT EXISTS "coinpalApiKey" TEXT;`)
        await prisma.$executeRawUnsafe(`ALTER TABLE "app_configs" ADD COLUMN IF NOT EXISTS "coinpalMerchantId" TEXT;`)

        console.log('Successfully added missing columns.')
    } catch (error) {
        console.error('Error syncing columns:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()

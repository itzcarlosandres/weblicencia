import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function GET() {
    try {
        const hashedPassword = await bcrypt.hash('admin123456', 10)

        const admin = await prisma.user.upsert({
            where: { email: 'admin@weblicencia.com' },
            update: {
                password: hashedPassword,
                role: 'ADMIN'
            },
            create: {
                email: 'admin@weblicencia.com',
                name: 'Administrador',
                password: hashedPassword,
                role: 'ADMIN',
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Admin user created/updated successfully',
            user: admin.email
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

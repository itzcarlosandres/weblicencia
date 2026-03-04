import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Listar todos los usuarios para ver qué tienen
        const users = await prisma.user.findMany()

        // Forzar al admin específico a tener el rol ADMIN
        const updated = await prisma.user.updateMany({
            where: { email: 'admin@weblicencia.com' },
            data: { role: 'ADMIN' }
        })

        return NextResponse.json({
            success: true,
            totalUsers: users.length,
            users: users.map(u => ({ email: u.email, role: u.role })),
            updatedCount: updated.count
        })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

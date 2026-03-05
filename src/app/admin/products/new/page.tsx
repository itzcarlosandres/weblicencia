import { Metadata } from 'next'
import { ProductForm } from '../_components/product-form'

import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
    title: 'Nuevo Producto | Admin',
    description: 'Crear un nuevo producto en el catálogo',
}

export default async function NewProductPage() {
    const categories = await (prisma as any).category.findMany({
        orderBy: { order: 'asc' }
    })

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <ProductForm categories={categories as any[]} />
            </div>
        </div>
    )
}

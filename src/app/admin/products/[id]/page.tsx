import { Metadata } from 'next'
import { ProductForm } from '../_components/product-form'
import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'

export const metadata: Metadata = {
    title: 'Editar Producto | Admin',
    description: 'Modificar producto existente',
}

interface EditProductPageProps {
    params: {
        id: string
    }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'ADMIN') {
        redirect('/')
    }

    const product = await prisma.product.findUnique({
        where: { id: params.id }
    })

    const categories = await prisma.category.findMany({
        orderBy: { order: 'asc' }
    })

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <ProductForm initialData={product} categories={categories} />
            </div>
        </div>
    )
}

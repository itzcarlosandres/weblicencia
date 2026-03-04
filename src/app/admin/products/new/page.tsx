import { Metadata } from 'next'
import { ProductForm } from '../_components/product-form'

export const metadata: Metadata = {
    title: 'Nuevo Producto | Admin',
    description: 'Crear un nuevo producto en el catálogo',
}

export default function NewProductPage() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <ProductForm />
            </div>
        </div>
    )
}

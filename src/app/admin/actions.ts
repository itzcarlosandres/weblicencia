'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const ProductSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    slug: z.string().min(3, 'El slug es requerido'),
    description: z.string().min(10, 'La descripción debe ser más detallada'),
    price: z.coerce.number().positive('El precio debe ser positivo'),
    category: z.string().min(1, 'La categoría es requerida'),
    stock: z.coerce.number().int().nonnegative(),
    image: z.string().optional(),
    badge: z.string().optional(),
    active: z.boolean().default(true),
})

export async function upsertProduct(data: z.infer<typeof ProductSchema>) {
    try {
        const validated = ProductSchema.parse(data)
        const { id, ...rest } = validated
        const cleanSlug = slugify(rest.slug)

        if (id) {
            await (prisma.product.update as any)({
                where: { id },
                data: {
                    title: rest.title,
                    slug: cleanSlug,
                    description: rest.description,
                    price: rest.price,
                    category: rest.category,
                    stock: rest.stock,
                    image: rest.image,
                    badge: rest.badge,
                    active: rest.active,
                },
            })
        } else {
            await (prisma.product.create as any)({
                data: {
                    title: rest.title,
                    slug: cleanSlug,
                    description: rest.description,
                    price: rest.price,
                    category: rest.category,
                    stock: rest.stock,
                    image: rest.image,
                    badge: rest.badge,
                    active: rest.active,
                },
            })
        }

        revalidatePath('/admin/products')
        revalidatePath('/products')
        return { success: true }
    } catch (error: any) {
        console.error('Error saving product:', error)
        return {
            success: false,
            error: error.message || 'Error desconocido en el servidor'
        }
    }
}

export async function deleteProduct(id: string) {
    // En lugar de borrar físicamente (para mantener integridad de órdenes), 
    // lo marcamos como inactivo
    await prisma.product.update({
        where: { id },
        data: { active: false },
    })

    revalidatePath('/admin/products')
    return { success: true }
}

export async function importLicenseKeys(csvData: string, productId?: string) {
    try {
        const lines = csvData.split('\n')
        let importedCount = 0
        let duplicateCount = 0

        for (const line of lines) {
            const parts = line.split(',').map(s => s.trim())
            if (parts.length === 0 || !parts[0]) continue

            let targetProductId = productId
            let key = parts[0]

            if (!targetProductId) {
                const slug = parts[0]
                key = parts[1]
                if (!slug || !key) continue

                const product = await prisma.product.findUnique({
                    where: { slug }
                })
                if (product) targetProductId = product.id
            } else {
                key = parts.length > 1 ? parts[1] : parts[0]
            }

            if (targetProductId && key) {
                // Verificar si la clave ya existe
                const existingKey = await prisma.licenseKey.findUnique({
                    where: { key }
                })

                if (existingKey) {
                    duplicateCount++
                    continue
                }

                await prisma.licenseKey.create({
                    data: {
                        key,
                        productId: targetProductId,
                        status: 'AVAILABLE'
                    }
                })
                importedCount++
            }
        }

        revalidatePath('/admin/keys')
        revalidatePath('/admin/products')
        return {
            success: true,
            importedCount,
            duplicateCount
        }
    } catch (error: any) {
        console.error('Error importing keys:', error)
        return { success: false, error: error.message || 'Error al procesar las claves' }
    }
}

export async function deleteLicenseKey(id: string) {
    try {
        await prisma.licenseKey.delete({
            where: { id }
        })
        revalidatePath('/admin/keys')
        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function updateLicenseKey(id: string, data: { key?: string, status?: string }) {
    try {
        await prisma.licenseKey.update({
            where: { id },
            data
        })
        revalidatePath('/admin/keys')
        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Comenzando seed de base de datos...')

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('admin123456', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@weblicencia.com' },
    update: {},
    create: {
      email: 'admin@weblicencia.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Usuario admin creado:', admin.email)

  // Crear usuario de prueba
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Cliente de Prueba',
      password: await bcrypt.hash('password123', 10),
      role: 'CUSTOMER',
    },
  })

  console.log('✅ Usuario cliente creado:', customer.email)

  // Crear productos de prueba
  const products = [
    {
      title: 'Windows 11 Pro',
      slug: 'windows-11-pro',
      description: 'Licencia oficial de Windows 11 Pro para 1 PC. Entrega digital instantánea.',
      price: 29.99,
      category: 'Software',
      stock: 100,
      image: '🪟',
      active: true,
    },
    {
      title: 'Microsoft Office 365',
      slug: 'microsoft-office-365',
      description: 'Suscripción anual a Microsoft Office 365 con acceso a Word, Excel, PowerPoint y más.',
      price: 49.99,
      category: 'Productividad',
      stock: 150,
      image: '📊',
      active: true,
    },
    {
      title: 'Adobe Creative Cloud',
      slug: 'adobe-creative-cloud',
      description: 'Suite completa de Adobe: Photoshop, Illustrator, InDesign, Premiere Pro y más.',
      price: 79.99,
      category: 'Diseño',
      stock: 75,
      image: '🎨',
      active: true,
    },
    {
      title: 'Netflix Premium 1 Año',
      slug: 'netflix-premium-1year',
      description: 'Suscripción anual a Netflix Premium con soporte para 4 pantallas simultáneas.',
      price: 99.99,
      category: 'Streaming',
      stock: 200,
      image: '🎬',
      active: true,
    },
    {
      title: 'Spotify Premium 6 Meses',
      slug: 'spotify-premium-6months',
      description: 'Acceso 6 meses a Spotify Premium sin anuncios y con descargas offline.',
      price: 44.99,
      category: 'Música',
      stock: 250,
      image: '🎵',
      active: true,
    },
    {
      title: 'Game Pass Ultimate',
      slug: 'game-pass-ultimate',
      description: 'Xbox Game Pass Ultimate con acceso a más de 500 juegos.',
      price: 139.99,
      category: 'Juegos',
      stock: 120,
      image: '🎮',
      active: true,
    },
  ]

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData as any,
    })

    console.log('✅ Producto creado:', product.title)

    // Crear claves de licencia para cada producto
    for (let i = 0; i < 20; i++) {
      const key = `${product.slug.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      await prisma.licenseKey.create({
        data: {
          key,
          productId: product.id,
          status: 'AVAILABLE',
        },
      })
    }

    console.log(`✅ 20 claves de licencia creadas para ${product.title}`)
  }

  // Crear un cupón de prueba
  const coupon = await prisma.coupon.create({
    data: {
      code: 'BIENVENIDA10',
      discount: 10,
      type: 'percentage',
      maxUses: 100,
      active: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    },
  })

  console.log('✅ Cupón creado:', coupon.code)

  console.log('🌱 Seed completado exitosamente!')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

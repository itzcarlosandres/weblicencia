import { Metadata } from 'next'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Explore nuestro catálogo de productos',
}

const mockProducts = [
  {
    id: '1',
    title: 'Windows 11 Pro',
    price: 29.99,
    category: 'Software',
    rating: 4.8,
    reviews: 324,
    image: '🪟',
    hot: true,
  },
  {
    id: '2',
    title: 'Microsoft Office 365',
    price: 49.99,
    category: 'Productividad',
    rating: 4.9,
    reviews: 512,
    image: '📊',
    hot: false,
  },
  {
    id: '3',
    title: 'Adobe Creative Cloud',
    price: 79.99,
    category: 'Diseño',
    rating: 4.7,
    reviews: 287,
    image: '🎨',
    hot: true,
  },
  {
    id: '4',
    title: 'Netflix Premium 1 Año',
    price: 99.99,
    category: 'Streaming',
    rating: 4.9,
    reviews: 1200,
    image: '🎬',
    hot: false,
  },
  {
    id: '5',
    title: 'Spotify Premium 6 Meses',
    price: 44.99,
    category: 'Música',
    rating: 4.8,
    reviews: 890,
    image: '🎵',
    hot: false,
  },
  {
    id: '6',
    title: 'Game Pass Ultimate',
    price: 139.99,
    category: 'Juegos',
    rating: 4.9,
    reviews: 2100,
    image: '🎮',
    hot: true,
  },
]

function ProductsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg hover:border-accent transition-all h-full flex flex-col">
          <CardContent className="p-6 pt-6 flex-1">
            <div className="mb-4">
              {product.hot && (
                <Badge className="bg-red-500 text-white">🔥 HOT</Badge>
              )}
            </div>

            <div className="mb-4 text-6xl text-center py-4 bg-muted rounded-lg">
              {product.image}
            </div>

            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {product.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-3">
              {product.category}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            <div className="text-2xl font-bold text-accent mb-4">
              ${product.price.toFixed(2)}
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Link href={`/product/${product.id}`} className="w-full">
              <Button className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Comprar Ahora
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Productos</h1>
          <p className="text-lg text-muted-foreground">
            Explora nuestro extenso catálogo de licencias y códigos digitales
          </p>
        </div>

        <Suspense fallback={<div>Cargando productos...</div>}>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  )
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(price)
}

export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return formatter.format(date)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'PAID': 'bg-green-100 text-green-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'FAILED': 'bg-red-100 text-red-800',
    'CANCELED': 'bg-gray-100 text-gray-800',
    'AVAILABLE': 'bg-green-100 text-green-800',
    'SOLD': 'bg-blue-100 text-blue-800',
    'REVOKED': 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function generateOrderNumber(): string {
  return `WL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')                   // Descomponer caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '')    // Eliminar diacríticos (acentos)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')               // Reemplazar espacios por -
    .replace(/[^\w-]+/g, '')            // Eliminar caracteres no válidos (incluyendo símbolos)
    .replace(/--+/g, '-')               // Reemplazar múltiples - por uno solo
    .replace(/^-+/, '')                 // Eliminar - al inicio
    .replace(/-+$/, '')                 // Eliminar - al final
}

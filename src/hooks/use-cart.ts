import { useState, useEffect } from 'react'

export interface CartItem {
    id: string
    title: string
    price: number
    quantity: number
    image?: string
}

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (e) {
                console.error('Failed to parse cart', e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart, isLoaded])

    const addToCart = (product: any, quantity: number = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [
                ...prev,
                {
                    id: product.id,
                    title: product.title,
                    price: Number(product.price),
                    quantity,
                    image: product.image,
                },
            ]
        })
    }

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        isLoaded,
    }
}

'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, LogOut, Menu, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "border-b border-white/5 bg-black/80 backdrop-blur-xl py-3"
        : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-black fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-white leading-none">WebLicencia</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none">Premium Store</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {['Categorías', 'Trending', 'Acerca de'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-accent transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            <Link href="/cart">
              <Button size="icon" variant="ghost" className="text-white hover:text-accent hover:bg-white/5 rounded-xl">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>

            {session ? (
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-2xl p-1">
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button size="sm" className="bg-accent text-black hover:bg-white font-black uppercase tracking-widest text-[10px] px-4 h-9 rounded-xl">
                      ADMIN PANEL
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button size="icon" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5 rounded-xl">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="w-[1px] h-4 bg-white/10" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/50 hover:text-red-400 hover:bg-white/5 rounded-xl"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-black hover:bg-accent hover:text-white rounded-none font-black uppercase tracking-widest text-[10px] h-10 px-6 transition-all">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/5 p-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            {['Categorías', 'Trending', 'Acerca de'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-lg font-black uppercase tracking-[0.2em] text-white hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

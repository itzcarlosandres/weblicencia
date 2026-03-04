'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, LogOut, Menu, Shield, Box, Zap, Key, Monitor, Database } from 'lucide-react'
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

  const navLinks = [
    { name: 'Catálogo', href: '/products', icon: <Box className="w-3.5 h-3.5" /> },
    { name: 'Lo Nuevo', href: '/#trending', icon: <Zap className="w-3.5 h-3.5" /> },
    { name: 'Premium', href: '/products?category=Software', icon: <Monitor className="w-3.5 h-3.5" /> },
  ]

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      scrolled
        ? "border-b border-white/5 bg-black/60 backdrop-blur-2xl py-3"
        : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group outline-none">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full group-hover:bg-accent/40 transition-all duration-500" />
              <div className="relative w-10 h-10 bg-accent rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Shield className="w-6 h-6 text-black fill-current" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-white leading-none uppercase">WebLicencia</span>
              <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em] leading-none mt-1">Digital Assets</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/5 rounded-2xl px-2 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-all rounded-xl hover:bg-white/5"
              >
                <span className="text-accent group-hover:scale-110 transition-transform opacity-30 group-hover:opacity-100">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            <Link href="/cart">
              <Button size="icon" variant="ghost" className="text-white/60 hover:text-accent hover:bg-white/5 rounded-2xl w-11 h-11 border border-transparent hover:border-white/10 transition-all">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>

            {session ? (
              <div className="flex items-center space-x-2 bg-white/[0.03] border border-white/5 rounded-2xl p-1.5">
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button size="sm" className="bg-accent text-black hover:bg-white font-black uppercase tracking-widest text-[9px] px-4 h-9 rounded-xl shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
                      Portal Admin
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button size="icon" variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl w-9 h-9">
                    <User className="w-4 h-4" />
                  </Button>
                </Link>
                <div className="w-[1px] h-4 bg-white/10 mx-1" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/20 hover:text-red-500 hover:bg-red-500/5 rounded-xl w-9 h-9 transition-all"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white rounded-xl h-11 px-6">
                    Acceso
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-black hover:bg-accent hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] h-11 px-8 shadow-2xl transition-all border-none">
                    Unirse
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 hover:text-accent transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 mt-4 space-y-6 animate-in fade-in zoom-in-95 duration-500 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-4 text-xl font-black uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-accent">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

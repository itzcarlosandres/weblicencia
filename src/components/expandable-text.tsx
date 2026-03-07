'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExpandableTextProps {
    text: string
    maxLines?: number
    className?: string
}

export function ExpandableText({ text, maxLines = 2, className }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    if (!text) return null

    return (
        <div className={cn("space-y-4", className)}>
            <div
                className={cn(
                    "relative overflow-hidden transition-all duration-700 ease-in-out",
                    !isExpanded && "max-h-[3rem]" // Roughly 2 lines depending on font size/line-height
                )}
                style={{
                    display: isExpanded ? 'block' : '-webkit-box',
                    WebkitLineClamp: isExpanded ? 'unset' : maxLines,
                    WebkitBoxOrient: 'vertical',
                }}
            >
                <p className="text-xl text-white/50 leading-relaxed font-medium whitespace-pre-line">
                    {text}
                </p>

                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                )}
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent hover:text-white transition-colors group"
            >
                {isExpanded ? (
                    <>
                        Mostrar Menos
                        <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                ) : (
                    <>
                        Leer Más
                        <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                    </>
                )}
            </button>
        </div>
    )
}

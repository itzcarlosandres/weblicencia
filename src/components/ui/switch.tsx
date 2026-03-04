"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<HTMLDivElement, { checked?: boolean; onCheckedChange?: (checked: boolean) => void; className?: string }>(
    ({ checked, onCheckedChange, className }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
                    checked ? "bg-accent" : "bg-muted",
                    className
                )}
                onClick={() => onCheckedChange?.(!checked)}
            >
                <span
                    className={cn(
                        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg transition-transform",
                        checked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </div>
        )
    }
)
Switch.displayName = "Switch"

export { Switch }

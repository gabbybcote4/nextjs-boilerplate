"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { themes } from "@/lib/themes"
import "@/styles/theme.css"

interface ThemeProviderProps {
  children: React.ReactNode
}

function ThemeEffect({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme)

    // Add transition class
    const root = document.documentElement
    if (!root.classList.contains('theme-transition')) {
      root.classList.add('theme-transition')
    }
  }, [setTheme])

  React.useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return <>{children}</>
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={Object.keys(themes)}
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="theme"
    >
      <ThemeEffect>{children}</ThemeEffect>
    </NextThemesProvider>
  )
}

export { useTheme }

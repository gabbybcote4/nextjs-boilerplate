"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { ThemePreview } from "@/components/ui/theme-preview"
import { themes, ThemeName } from "@/lib/themes"
import { useEffect, useState } from "react"

export function DisplayAppearancePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(theme || 'light')

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update current theme when theme changes
  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme)
    }
  }, [theme])

  // Handle theme change
  const handleThemeChange = (newTheme: ThemeName) => {
    setCurrentTheme(newTheme)
    setTheme(newTheme)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Display & Appearance</h1>
        <p className="text-sm text-muted-foreground">Customize how the app looks</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.entries(themes).map(([key, themeConfig]) => (
                <ThemePreview
                  key={key}
                  theme={themeConfig}
                  isSelected={currentTheme === key}
                  onClick={() => handleThemeChange(key as ThemeName)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Layout</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Reduce spacing between elements
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Large Text</Label>
                <p className="text-sm text-muted-foreground">
                  Increase text size throughout the app
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Accessibility</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">High Contrast</Label>
                <p className="text-sm text-muted-foreground">
                  Increase color contrast for better visibility
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

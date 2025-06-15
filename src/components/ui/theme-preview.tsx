"use client"

import { Card } from "./card"

interface ThemePreviewProps {
  theme: {
    name: string
    colors: Record<string, string>
  }
  isSelected?: boolean
  onClick?: () => void
}

export function ThemePreview({ theme, isSelected, onClick }: ThemePreviewProps) {
  return (
    <div data-theme={theme.name.toLowerCase()}>
      <Card 
        className={`relative cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-offset-2 ${
          isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
        onClick={onClick}
      >
        <div className="p-4 space-y-2 bg-background text-foreground">
          <div className="flex items-center justify-between">
            <div 
              className="h-3 w-24 rounded bg-primary"
            />
            <div 
              className="h-4 w-4 rounded-full bg-accent"
            />
          </div>
          <div className="space-y-1">
            <div 
              className="h-2 w-16 rounded bg-secondary"
            />
            <div 
              className="h-2 w-20 rounded bg-foreground"
            />
          </div>
        </div>
        <div 
          className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-center bg-primary text-primary-foreground"
        >
          {theme.name}
        </div>
      </Card>
    </div>
  )
}

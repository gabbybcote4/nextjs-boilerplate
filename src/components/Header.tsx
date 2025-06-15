"use client"

import Link from "next/link"
import { Settings } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  
  // Don't render header in settings pages
  if (pathname?.startsWith("/settings")) return null

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          Habit Tracker
        </Link>
        <Link 
          href="/settings" 
          className="p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Settings className="h-5 w-5" />
        </Link>
      </div>
    </header>
  )
}

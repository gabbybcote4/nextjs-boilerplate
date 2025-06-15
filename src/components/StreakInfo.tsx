"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InfoIcon } from "lucide-react"

export function StreakInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center">
          <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Streak Levels</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between text-sm">
            <span>30+ days:</span>
            <span className="text-lg">🔥🔥🔥</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>14+ days:</span>
            <span className="text-lg">🔥🔥</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>7+ days:</span>
            <span className="text-lg">🔥</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>3+ days:</span>
            <span className="text-lg">✨</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Getting started:</span>
            <span className="text-lg">⚡</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

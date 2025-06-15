"use client"

import { useXP } from "@/hooks/useXP"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { TrophyIcon } from "lucide-react"
import { useState, useEffect } from "react"

export function XPProgress() {
  const { currentXP, level, xpToNextLevel, currentLevelXP } = useXP()
  const [isUpdated, setIsUpdated] = useState(false)
  
  // Calculate XP progress for current level
  const earnedXP = Math.max(0, currentLevelXP - xpToNextLevel)
  const progressPercent = Math.min(100, Math.max(0, (earnedXP / currentLevelXP) * 100))

  // Format display values
  const displayEarnedXP = Math.min(earnedXP, currentLevelXP)
  const displayNeededXP = xpToNextLevel > 0 ? `${xpToNextLevel} XP needed` : 'Level Complete!'

  // Handle XP updates
  useEffect(() => {
    const handleXPUpdate = () => {
      setIsUpdated(true)
      setTimeout(() => setIsUpdated(false), 1000)
    }

    // Initial animation if there's XP
    if (currentXP > 0) {
      handleXPUpdate()
    }

    // Listen for future updates
    window.addEventListener('xp-updated', handleXPUpdate)
    return () => window.removeEventListener('xp-updated', handleXPUpdate)
  }, [currentXP])

  return (
    <Card className={`p-2 bg-white dark:bg-gray-800 transition-colors duration-300 ${isUpdated ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900">
            <TrophyIcon className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium">Level {level}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {displayEarnedXP}/{currentLevelXP} XP
                </p>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
              <p className="text-[10px] text-center text-gray-500 dark:text-gray-400">
                {displayNeededXP}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

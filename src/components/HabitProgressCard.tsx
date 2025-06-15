"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { type Habit } from "@/hooks/useHabits"
import { getStreakEmoji } from "@/lib/streak-utils"

interface HabitProgressCardProps {
  habit: Habit
  onComplete: (id: string, value?: number) => void
}

export function HabitProgressCard({ habit, onComplete }: HabitProgressCardProps) {
  return (
    <Card className="p-3 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
              {habit.name}
            </h3>
            <span className="text-sm">{getStreakEmoji(habit.streak)}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="text-gray-500 dark:text-gray-400">{(habit.progress || 0).toFixed(1)}%</span>
            </div>
            <Progress value={habit.progress} className="h-1" />
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline"
          className="shrink-0 h-8 w-8 p-0 rounded-full"
          onClick={() => onComplete(habit.id)}
        >
          ✓
        </Button>
      </div>
    </Card>
  )
}

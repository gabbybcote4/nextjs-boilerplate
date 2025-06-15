"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { type Habit } from "@/hooks/useHabits"
import { Input } from "./ui/input"
import { useState, useCallback } from "react"
import { getStreakEmoji } from "@/lib/streak-utils"
import { EditHabitModal } from "./EditHabitModal"
import { HabitDetails } from "./HabitDetails"
import { useXP } from "@/hooks/useXP"
import { toast } from "sonner"

interface HabitCardProps {
  habit: Habit
  onComplete: (id: string, value?: number) => { xp: { completion: number, streak: number, perfectWeek: number } }
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Habit>) => void
}

export function HabitCard({ habit, onComplete, onDelete, onUpdate }: HabitCardProps) {
  const [value, setValue] = useState<number>(1)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not completed yet'
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const { getXPForAction } = useXP()

  const handleComplete = useCallback(() => {
    const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted) : null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    lastCompleted?.setHours(0, 0, 0, 0)
    
    const isFirstCompletionToday = !lastCompleted || lastCompleted.getTime() !== today.getTime()

    const result = habit.type === 'daily' ? onComplete(habit.id) : onComplete(habit.id, value)

    // Only show XP toast if this is the first completion today
    if (isFirstCompletionToday) {
      // Use setTimeout to ensure state updates have completed
      setTimeout(() => {
        const streakXP = Math.min(10, habit.streak || 0)
        const totalXP = 5 + streakXP

        toast.success(
          <div className="flex flex-col gap-1">
            <p>Habit completed! 🎉</p>
            <p className="text-sm text-yellow-500 dark:text-yellow-400">
              +5 XP (completion)
              {streakXP > 0 && ` +${streakXP} XP (streak)`}
              {` = ${totalXP} XP total`}
            </p>
          </div>
        )
      }, 0)
    }
  }, [habit, onComplete, value])

  return (
    <Card className="p-3 sm:p-4 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">{habit.name}</h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="capitalize">{habit.category}</span>
              <span>·</span>
              <span className="capitalize">{habit.frequency || 'daily'}</span>
              <span>·</span>
              <span className="capitalize">{habit.type}</span>
              {habit.target && (
                <>
                  <span>·</span>
                  <span>Target: {habit.target}{habit.type === 'time-based' ? ' min' : ''}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setShowDetailsModal(true)}
            >
              📊
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setShowEditModal(true)}
            >
              ✏️
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
              onClick={() => onDelete(habit.id)}
            >
              🗑️
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">
              {getStreakEmoji(habit.streak)} {habit.streak}d
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-medium whitespace-nowrap text-xs">
              🏆 Best: {habit.longestStreak}d
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {habit.lastCompleted ? formatDate(habit.lastCompleted) : 'Not started'}
            </span>
          </div>
          <Progress value={habit.progress} className="h-1.5" />
        </div>

        <div className="flex gap-2 items-center">
          {habit.type !== 'daily' && (
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              min={1}
              max={habit.target}
              className="w-16 h-8 text-sm bg-white dark:bg-gray-800 dark:text-white"
            />
          )}
          <Button 
            onClick={handleComplete}
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-sm"
          >
            {habit.type === 'daily' ? 'Complete' : 'Add Progress'}
          </Button>
        </div>
      </div>

      <>
        <EditHabitModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          onSave={(updatedHabit) => {
            const { id, ...updates } = updatedHabit;
            onUpdate(id, updates);
          }}
          habit={habit}
        />
        <HabitDetails
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
          habit={habit}
        />
      </>
    </Card>
  )
}

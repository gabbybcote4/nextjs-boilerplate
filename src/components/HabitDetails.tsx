"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { type Habit } from "@/hooks/useHabits"
import { getStreakEmoji } from "@/lib/streak-utils"
import { Progress } from "./ui/progress"

interface HabitDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  habit: Habit
}

export function HabitDetails({ open, onOpenChange, habit }: HabitDetailsProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not started'
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCompletionRate = () => {
    if (!habit.lastCompleted) return 0
    const startDate = new Date(habit.lastCompleted)
    startDate.setDate(startDate.getDate() - habit.streak)
    const totalDays = Math.ceil((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return Number(((habit.streak / totalDays) * 100).toFixed(1)) || 0
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl truncate">{habit.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto max-h-[calc(80vh-8rem)]">
          {/* Basic Info */}
          <Card className="p-4 bg-white dark:bg-gray-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold dark:text-white">{habit.streak}</p>
                <h3 className="text-xs text-gray-500">Current Streak</h3>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold dark:text-white">{habit.longestStreak}</p>
                <h3 className="text-xs text-gray-500">Best Streak</h3>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold dark:text-white">{getCompletionRate()}%</p>
                <h3 className="text-xs text-gray-500">Completion Rate</h3>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold dark:text-white break-words">{formatDate(habit.lastCompleted)}</p>
                <h3 className="text-xs text-gray-500">Last Completed</h3>
              </div>
            </div>
          </Card>

          {/* Current Progress */}
          <Card className="p-4 bg-white dark:bg-gray-800">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <h3 className="font-medium">Current Progress</h3>
                <span className="text-gray-500">{(habit.progress || 0).toFixed(1)}%</span>
              </div>
              <Progress value={habit.progress} className="h-2" />
            </div>
          </Card>

          {/* History */}
          <Card className="p-4 bg-white dark:bg-gray-800">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Started</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {habit.firstCompleted ? formatDate(new Date(habit.firstCompleted)) : 'Not yet started'}
                </p>
              </div>
              {habit.firstCompleted && habit.lastCompleted && (
                <div>
                  <h3 className="text-sm font-medium">Days Active</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {Math.ceil((new Date().getTime() - new Date(habit.firstCompleted).getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Habit Details */}
          <Card className="p-4 bg-white dark:bg-gray-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="text-sm font-medium mb-1">Category</h3>
                <p className="text-gray-500 capitalize">{habit.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Type</h3>
                <p className="text-gray-500 capitalize">{habit.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Frequency</h3>
                <p className="text-gray-500 capitalize">{habit.frequency || 'daily'}</p>
              </div>
              {habit.target && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Target</h3>
                  <p className="text-gray-500">
                    {habit.target}{habit.type === 'time-based' ? ' minutes' : ''}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

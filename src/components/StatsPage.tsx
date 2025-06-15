"use client"

import { Card } from "@/components/ui/card"
import { useHabits } from "@/hooks/useHabits"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function StatsPage() {
  const { habits } = useHabits()
  const [timeframe, setTimeframe] = useState("all")

  const getStats = () => {
    const total = habits.length
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const completed = habits.filter(h => {
      if (!h.lastCompleted) return false
      const lastCompleted = new Date(h.lastCompleted)
      lastCompleted.setHours(0, 0, 0, 0)
      return lastCompleted.getTime() === today.getTime()
    }).length

    const active = habits.filter(h => {
      if (!h.lastCompleted) return false
      const lastCompleted = new Date(h.lastCompleted)
      const daysSinceLastCompleted = Math.floor((today.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24))
      return daysSinceLastCompleted <= 7 // Consider habits active if completed within last week
    }).length

    const avgStreak = total ? 
      Math.round(habits.reduce((acc, h) => acc + h.streak, 0) / total) : 0
    const bestStreak = Math.max(...habits.map(h => h.longestStreak))
    
    return {
      total,
      active,
      completed,
      avgStreak,
      bestStreak,
      completionRate: total ? Math.round((completed / total) * 100) : 0
    }
  }

  const getCategoryStats = () => {
    const categories: { [key: string]: number } = {}
    habits.forEach(habit => {
      categories[habit.category] = (categories[habit.category] || 0) + 1
    })
    return Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({
        category: category.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        count,
        percentage: Math.round((count / habits.length) * 100)
      }))
  }

  const getFrequencyStats = () => {
    const frequencies: { [key: string]: number } = {}
    habits.forEach(habit => {
      frequencies[habit.frequency] = (frequencies[habit.frequency] || 0) + 1
    })
    return Object.entries(frequencies)
      .sort((a, b) => b[1] - a[1])
      .map(([frequency, count]) => ({
        frequency: frequency.charAt(0).toUpperCase() + frequency.slice(1),
        count,
        percentage: Math.round((count / habits.length) * 100)
      }))
  }

  const stats = getStats()
  const categoryStats = getCategoryStats()
  const frequencyStats = getFrequencyStats()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Statistics</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track your habit formation progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white dark:bg-gray-800">
          <div className="text-center">
            <p className="text-3xl font-bold dark:text-white">{stats.avgStreak}d</p>
            <h3 className="text-sm text-gray-500">Average Streak</h3>
          </div>
        </Card>
        <Card className="p-4 bg-white dark:bg-gray-800">
          <div className="text-center">
            <p className="text-3xl font-bold dark:text-white">{stats.bestStreak}d</p>
            <h3 className="text-sm text-gray-500">Best Streak</h3>
          </div>
        </Card>
        <Card className="p-4 bg-white dark:bg-gray-800">
          <div className="text-center">
            <p className="text-3xl font-bold dark:text-white">{stats.completionRate}%</p>
            <h3 className="text-sm text-gray-500">Completion Rate</h3>
          </div>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Category Distribution</h3>
            <p className="text-sm text-gray-500">{habits.length} total habits</p>
          </div>
          <div className="space-y-3">
            {categoryStats.map(({ category, count, percentage }) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{category}</span>
                  <span className="text-gray-500">{count} habits ({percentage}%)</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Frequency Distribution */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Frequency Distribution</h3>
          <div className="space-y-3">
            {frequencyStats.map(({ frequency, count, percentage }) => (
              <div key={frequency} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{frequency}</span>
                  <span className="text-gray-500">{count} habits ({percentage}%)</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Completion Status */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Completion Status</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Completed Today</span>
                <span className="text-gray-500">{stats.completed} habits ({stats.completionRate}%)</span>
              </div>
              <Progress value={stats.completionRate} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Active Habits</span>
                <span className="text-gray-500">{stats.active} of {stats.total} ({Math.round((stats.active / stats.total) * 100)}%)</span>
              </div>
              <Progress value={stats.active / stats.total * 100} className="h-2" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

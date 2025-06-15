"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/lib/suggested-habits"
import { useState, useEffect } from "react"
import { Card } from "./ui/card"

interface EditHabitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (habit: any) => void
  habit: any
}

export function EditHabitModal({ open, onOpenChange, onSave, habit }: EditHabitModalProps) {
  const [name, setName] = useState(habit.name)
  const [category, setCategory] = useState(habit.category)
  const [type, setType] = useState<"daily" | "quantifiable" | "time-based">(habit.type)
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(habit.frequency || "daily")
  const [target, setTarget] = useState<number | undefined>(habit.target)
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes")

  useEffect(() => {
    // Convert minutes to hours if the target is more than 60 minutes
    if (habit.type === "time-based" && habit.target >= 60) {
      setTimeUnit("hours")
      setTarget(Math.round(habit.target / 60))
    } else {
      setTimeUnit("minutes")
      setTarget(habit.target)
    }
    setFrequency(habit.frequency || "daily")
  }, [habit])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...habit,
      name,
      category,
      type,
      frequency,
      target: type === "daily" 
        ? undefined 
        : type === "time-based" && timeUnit === "hours"
          ? (target || 0) * 60 // Convert hours to minutes
          : target,
      // Don't modify progress, lastCompleted, streak, or longestStreak
      progress: habit.progress,
      lastCompleted: habit.lastCompleted,
      streak: habit.streak,
      longestStreak: habit.longestStreak
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
        </DialogHeader>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(value: "daily" | "quantifiable" | "time-based") => setType(value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Checkbox</SelectItem>
                  <SelectItem value="quantifiable">Quantifiable Goal</SelectItem>
                  <SelectItem value="time-based">Time-based</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select 
                value={frequency} 
                onValueChange={(value: "daily" | "weekly" | "monthly") => setFrequency(value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {type !== "daily" && (
              <div className="space-y-2">
                <Label htmlFor="target">Target {type === "time-based" ? "Time" : "Amount"}</Label>
                <div className="flex gap-2">
                  <Input
                    id="target"
                    type="number"
                    min="1"
                    value={target || ""}
                    onChange={(e) => setTarget(parseInt(e.target.value))}
                    required
                  />
                  {type === "time-based" && (
                    <Select 
                      value={timeUnit} 
                      onValueChange={(value: "minutes" | "hours") => {
                        setTimeUnit(value);
                        // Convert existing target value
                        if (target) {
                          if (value === "hours" && timeUnit === "minutes") {
                            setTarget(Math.max(1, Math.round(target / 60)));
                          } else if (value === "minutes" && timeUnit === "hours") {
                            setTarget(target * 60);
                          }
                        }
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

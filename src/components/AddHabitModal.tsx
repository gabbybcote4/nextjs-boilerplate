"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, suggestedHabits, type SuggestedHabit } from "@/lib/suggested-habits"
import { useState } from "react"
import { Card } from "./ui/card"

interface AddHabitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddHabit: (habit: any) => void
}

export function AddHabitModal({ open, onOpenChange, onAddHabit }: AddHabitModalProps) {
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState<"daily" | "quantifiable" | "time-based">("daily")
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("daily")
  const [target, setTarget] = useState<number>()
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours">("minutes")
  const [addedHabits, setAddedHabits] = useState<Set<string>>(new Set())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddHabit({
      name,
      category,
      type,
      frequency,
      target: type === "daily" 
        ? undefined 
        : type === "time-based" && timeUnit === "hours"
          ? (target || 0) * 60 // Convert hours to minutes
          : target,
    })
    setName("")
    setCategory("")
    setType("daily")
    setTarget(undefined)
    setTimeUnit("minutes")
    setShowCustomForm(false)
  }

  const handleSuggestionClick = (suggestion: SuggestedHabit) => {
    onAddHabit({
      name: suggestion.name,
      category: suggestion.category,
      type: suggestion.type,
      target: suggestion.target,
    })
    // Add to set of added habits
    setAddedHabits(prev => new Set([...prev, suggestion.name]))
  }

  const handleClose = () => {
    setShowCustomForm(false)
    setAddedHabits(new Set())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Habits</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!showCustomForm ? (
            <>
              <div className="flex justify-end">
                <Button onClick={() => setShowCustomForm(true)}>Create Custom Habit</Button>
              </div>

              <div className="space-y-6">
                {categories.map(category => {
                  const categoryHabits = suggestedHabits.filter((h: SuggestedHabit) => h.category === category);
                  if (categoryHabits.length === 0) return null;
                  
                  return (
                    <div key={category} className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {category.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categoryHabits.map((habit: SuggestedHabit, index: number) => {
                          const isAdded = addedHabits.has(habit.name);
                          return (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(habit)}
                              disabled={isAdded}
                              className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                                isAdded 
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 cursor-default'
                                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
                              }`}
                            >
                              {habit.name}
                              {isAdded && ' ✓'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
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
                  <Button type="submit">Add Habit</Button>
                  <Button type="button" variant="outline" onClick={() => setShowCustomForm(false)}>
                    Back to Suggestions
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

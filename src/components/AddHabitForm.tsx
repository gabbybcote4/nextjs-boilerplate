"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddHabitModal } from "./AddHabitModal"

interface AddHabitFormProps {
  onAddHabit: (habit: any) => void
}

export function AddHabitForm({ onAddHabit }: AddHabitFormProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex justify-end">
      <Button onClick={() => setShowModal(true)}>Add New Habit</Button>
      <AddHabitModal 
        open={showModal}
        onOpenChange={setShowModal}
        onAddHabit={onAddHabit}
      />
    </div>
  )
}

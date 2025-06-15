"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserProfile, defaultProfile } from "@/hooks/useUserProfile"
import { Textarea } from "@/components/ui/textarea"

const questions = [
  {
    id: "welcome",
    title: "Welcome to Habit Tracker",
    description: "Let's personalize your experience. First, tell us a bit about yourself.",
    type: "info",
    image: "👋"
  },
  {
    id: "profile",
    title: "Your Profile",
    description: "Help us get to know you better.",
    type: "profile",
    image: "👤"
  },
  {
    id: "wakeTime",
    title: "What time do you usually wake up?",
    description: "This helps us suggest the best times for your morning habits.",
    type: "time",
    image: "🌅"
  },
  {
    id: "bedTime",
    title: "What time do you usually go to bed?",
    description: "We'll help you build a consistent evening routine.",
    type: "time",
    image: "🌙"
  },
  {
    id: "motivation",
    title: "What motivates you the most?",
    description: "Understanding your motivation helps us provide better support.",
    type: "select",
    options: [
      "Progress tracking and statistics",
      "Achievement badges and rewards",
      "Building long-term consistency",
      "Reaching specific goals",
      "Competing with others"
    ],
    image: "🎯"
  },
  {
    id: "reminderType",
    title: "What kind of reminders work best for you?",
    description: "Choose your preferred reminder style:",
    type: "select",
    options: [
      "Push notifications",
      "Email reminders",
      "Calendar integration",
      "Gentle nudges",
      "No reminders"
    ],
    image: "⏰"
  }
]

interface OnboardingModalProps {
  onComplete: () => void
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { setProfile } = useUserProfile()
  const [answers, setAnswers] = useState<Record<string, any>>({
    name: "",
    email: "",
    bio: "",
    ...defaultProfile.preferences
  })

  const handleNext = () => {
    if (currentStep === questions.length - 1) {
      setProfile({
        ...defaultProfile,
        name: answers.name,
        email: answers.email,
        bio: answers.bio,
        preferences: {
          wakeTime: answers.wakeTime,
          bedTime: answers.bedTime,
          primaryMotivation: answers.motivation,
          reminderPreference: answers.reminderType
        }
      })
      onComplete()
      localStorage.setItem("onboardingComplete", "true")
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: value
    }))
  }

  const currentQuestion = questions[currentStep]
  const canProceed = currentQuestion.type === "info" || 
    (currentQuestion.type === "profile" ? answers.name.trim() : answers[currentQuestion.id])

  const renderInput = () => {
    if (currentQuestion.type === "profile") {
      return (
        <div className="space-y-4 w-full max-w-sm mx-auto">
          <Input
            placeholder="Your name"
            value={answers.name}
            onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
            className="bg-white dark:bg-gray-800"
            required
          />
          <Input
            type="email"
            placeholder="Email (optional)"
            value={answers.email}
            onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
            className="bg-white dark:bg-gray-800"
          />
          <Textarea
            placeholder="Tell us a bit about yourself (optional)"
            value={answers.bio}
            onChange={(e) => setAnswers(prev => ({ ...prev, bio: e.target.value }))}
            className="bg-white dark:bg-gray-800"
          />
        </div>
      )
    }

    switch (currentQuestion.type) {
      case "time":
        return (
          <Input
            type="time"
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            className="max-w-[200px] mx-auto bg-white dark:bg-gray-800"
          />
        )
      case "select":
        return (
          <Select value={answers[currentQuestion.id]} onValueChange={handleAnswer}>
            <SelectTrigger className="w-full max-w-[300px] mx-auto bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg p-6 bg-white dark:bg-gray-800">
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">{currentQuestion.image}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentQuestion.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {currentQuestion.description}
          </p>

          {renderInput()}

          <div className="flex justify-center gap-2 pt-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full bg-black hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            {currentStep === questions.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

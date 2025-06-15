"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("general")
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState("5")

  const handleSubmit = () => {
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        description: "We'd love to hear your thoughts!",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send the feedback to your backend
    console.log({
      type: feedbackType,
      feedback,
      rating: parseInt(rating),
    })

    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input and will use it to improve the app.",
    })

    // Reset form
    setFeedback("")
    setFeedbackType("general")
    setRating("5")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leave us Feedback</h1>
        <p className="text-sm text-gray-500">Help us improve your experience</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Feedback Type</Label>
              <Select value={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Feedback</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Rate your experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="1">1 - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Your Feedback</Label>
              <Textarea 
                placeholder="Tell us what you think..."
                className="min-h-[200px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Please be as specific as possible. Include steps to reproduce if reporting a bug.
              </p>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Other Ways to Reach Us</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
              <h3 className="font-medium mb-2">Email Support</h3>
              <p className="text-sm text-gray-500">
                For urgent matters, email us at:<br />
                support@habittracker.com
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" className="w-full">
                Join Our Community
              </Button>
              <Button variant="outline" className="w-full">
                Follow Us on Twitter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

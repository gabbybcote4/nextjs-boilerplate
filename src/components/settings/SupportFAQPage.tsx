"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SupportFAQPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Support & FAQ</h1>
        <p className="text-sm text-gray-500">Get help and find answers to common questions</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search help articles..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do habits work?</AccordionTrigger>
              <AccordionContent>
                Habits are daily, weekly, or monthly activities that you want to track. Each time you complete
                a habit, you earn XP and build your streak. The more consistent you are, the more rewards you unlock.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What are streaks?</AccordionTrigger>
              <AccordionContent>
                A streak is the number of consecutive days you've completed a habit. The longer your streak,
                the more XP bonus you earn. Missing a day will reset your streak back to zero.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How does the XP system work?</AccordionTrigger>
              <AccordionContent>
                You earn XP (experience points) by completing habits and maintaining streaks. The more XP you
                earn, the higher your level becomes. Each level requires more XP than the last.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I customize my habits?</AccordionTrigger>
              <AccordionContent>
                Yes! You can customize the name, frequency, category, and target for each habit. You can also
                edit or delete habits at any time from the habit details page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I reset my progress?</AccordionTrigger>
              <AccordionContent>
                You can reset all your progress from the Privacy & Security settings. This will delete all
                habits, streaks, and XP. This action cannot be undone.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Need More Help?</h2>
          
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                View Documentation
              </Button>
            </div>

            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
              <h3 className="font-medium mb-2">Support Hours</h3>
              <p className="text-sm text-gray-500">
                Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                Response time: Within 24 hours
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Community Resources</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="w-full">
              Join Discord Community
            </Button>
            <Button variant="outline" className="w-full">
              Visit Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

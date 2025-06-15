"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function AccessibilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Accessibility</h1>
        <p className="text-sm text-gray-500">Customize your accessibility preferences</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Visual</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Reduce Motion</Label>
                <p className="text-sm text-gray-500">
                  Minimize animations throughout the app
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">High Contrast Mode</Label>
                <p className="text-sm text-gray-500">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-base">Text Size</Label>
                <span className="text-sm text-gray-500">100%</span>
              </div>
              <Slider
                defaultValue={[100]}
                max={200}
                min={75}
                step={25}
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                Adjust the size of text throughout the app
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Navigation</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Keyboard Navigation</Label>
                <p className="text-sm text-gray-500">
                  Enable keyboard shortcuts for navigation
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Screen Reader Support</Label>
                <p className="text-sm text-gray-500">
                  Optimize for screen readers
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Content</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Alternative Text</Label>
                <p className="text-sm text-gray-500">
                  Show alternative text for images
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Focus Indicators</Label>
                <p className="text-sm text-gray-500">
                  Show enhanced focus indicators
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Reading Time</Label>
                <p className="text-sm text-gray-500">
                  Show estimated reading time for content
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

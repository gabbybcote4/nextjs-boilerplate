"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-sm text-gray-500">Manage your notification preferences</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive reminders for your habits
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Daily Reminders</Label>
                <p className="text-sm text-gray-500">
                  Get notified about uncompleted habits
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Summary</Label>
                <p className="text-sm text-gray-500">
                  Receive a weekly progress report
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Achievement Alerts</Label>
                <p className="text-sm text-gray-500">
                  Get notified when you reach milestones
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates via email
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Quiet Hours</h2>
          <p className="text-sm text-gray-500">
            Notifications will be muted during these hours
          </p>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Quiet Hours</Label>
              <p className="text-sm text-gray-500">
                Automatically mute notifications during specified hours
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

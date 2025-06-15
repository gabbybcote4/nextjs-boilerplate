"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AppPermissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">App Permissions</h1>
        <p className="text-sm text-gray-500">Manage app access and permissions</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Device Permissions</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Camera Access</Label>
                <p className="text-sm text-gray-500">
                  Allow app to use camera for profile pictures
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Location Services</Label>
                <p className="text-sm text-gray-500">
                  Access to device location for weather updates
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Background App Refresh</Label>
                <p className="text-sm text-gray-500">
                  Keep app data up to date in the background
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Data Access</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Health Data</Label>
                <p className="text-sm text-gray-500">
                  Access to health and fitness data
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Calendar Integration</Label>
                <p className="text-sm text-gray-500">
                  Sync habits with your calendar
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Contacts Access</Label>
                <p className="text-sm text-gray-500">
                  Access to contacts for social features
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Third-Party Integrations</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Google Fit</Label>
                <p className="text-sm text-gray-500">
                  Sync data with Google Fit
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Apple Health</Label>
                <p className="text-sm text-gray-500">
                  Sync data with Apple Health
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Social Media</Label>
                <p className="text-sm text-gray-500">
                  Share achievements on social media
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              Manage Third-Party Access
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

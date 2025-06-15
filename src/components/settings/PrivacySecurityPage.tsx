"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useHabits } from "@/hooks/useHabits"
import { useUserProfile } from "@/hooks/useUserProfile"
import { defaultProfile } from "@/hooks/useUserProfile"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function PrivacySecurityPage() {
  const { resetProgress } = useHabits()
  const { updateProfile } = useUserProfile()

  const handleReset = () => {
    localStorage.clear()
    window.dispatchEvent(new Event('habits-updated'))
    window.dispatchEvent(new Event('xp-updated'))
    updateProfile(defaultProfile)
    resetProgress()
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Privacy & Security</h1>
        <p className="text-sm text-gray-500">Manage your privacy settings and data</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Privacy Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Public Profile</Label>
                <p className="text-sm text-gray-500">
                  Allow others to see your progress
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Share Statistics</Label>
                <p className="text-sm text-gray-500">
                  Share anonymous usage statistics
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Activity Status</Label>
                <p className="text-sm text-gray-500">
                  Show when you're actively using the app
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold">Security</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Session Management</Label>
                <p className="text-sm text-gray-500">
                  Manage active sessions and devices
                </p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
          <div className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Reset All Data</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your habits,
                    progress, and reset all settings to their defaults.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="space-y-2">
              <Button variant="outline" className="text-red-600 dark:text-red-400 w-full">
                Delete Account
              </Button>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

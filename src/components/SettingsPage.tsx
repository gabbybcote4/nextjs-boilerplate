"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUserProfile } from "@/hooks/useUserProfile"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { defaultProfile } from "@/hooks/useUserProfile"
import { useHabits } from "@/hooks/useHabits"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsPage() {
  const { profile, updateProfile } = useUserProfile()
  const { habits, resetProgress } = useHabits()
  const { theme, setTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email || "",
    bio: profile.bio || "",
    wakeTime: profile.preferences.wakeTime,
    bedTime: profile.preferences.bedTime
  })

  const handleSave = () => {
    updateProfile({
      ...profile,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      preferences: {
        ...profile.preferences,
        wakeTime: formData.wakeTime,
        bedTime: formData.bedTime
      }
    })
    setIsEditing(false)
  }

  const handleReset = () => {
    localStorage.clear()
    window.dispatchEvent(new Event('habits-updated'))
    window.dispatchEvent(new Event('xp-updated'))
    updateProfile(defaultProfile)
    resetProgress()
    window.location.reload()
  }

  return (
    <div className="space-y-8 max-w-full px-4 md:px-0">
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-3 gap-4 bg-transparent h-auto p-0">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">User Settings</h3>
            <div className="flex flex-col gap-2">
              <TabsTrigger value="personal" className="w-full justify-start">Personal Info</TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start">Notifications</TabsTrigger>
              <TabsTrigger value="privacy" className="w-full justify-start">Privacy & Security</TabsTrigger>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">App Settings</h3>
            <div className="flex flex-col gap-2">
              <TabsTrigger value="display" className="w-full justify-start">Display & Appearance</TabsTrigger>
              <TabsTrigger value="accessibility" className="w-full justify-start">Accessibility</TabsTrigger>
              <TabsTrigger value="language" className="w-full justify-start">Language</TabsTrigger>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Other</h3>
            <div className="flex flex-col gap-2">
              <TabsTrigger value="permissions" className="w-full justify-start">App Permissions</TabsTrigger>
              <TabsTrigger value="support" className="w-full justify-start">Support & FAQ</TabsTrigger>
              <TabsTrigger value="feedback" className="w-full justify-start">Leave us Feedback</TabsTrigger>
            </div>
          </div>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Personal Information</h2>
                  <p className="text-sm text-gray-500">Manage your personal details</p>
                </div>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1">Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">Name</Label>
                    <p className="text-lg font-medium">{profile.name}</p>
                  </div>
                  {profile.email && (
                    <div>
                      <Label className="text-gray-500">Email</Label>
                      <p className="text-lg">{profile.email}</p>
                    </div>
                  )}
                  {profile.bio && (
                    <div>
                      <Label className="text-gray-500">Bio</Label>
                      <p>{profile.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <p className="text-sm text-gray-500">Manage your notification preferences</p>
              </div>
              
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
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive weekly progress reports
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">Privacy & Security</h2>
                <p className="text-sm text-gray-500">Manage your privacy settings</p>
              </div>
              
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
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                <div className="mt-4">
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
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">Display & Appearance</h2>
                <p className="text-sm text-gray-500">Customize how the app looks</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-gray-500">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">Accessibility</h2>
                <p className="text-sm text-gray-500">Customize your accessibility preferences</p>
              </div>
              
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">Language</h2>
                <p className="text-sm text-gray-500">Choose your preferred language</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">App Permissions</h2>
                <p className="text-sm text-gray-500">Manage app permissions</p>
              </div>
              
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">Support & FAQ</h2>
                <p className="text-sm text-gray-500">Get help and find answers to common questions</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2 className="text-2xl font-semibold">Leave us Feedback</h2>
                <p className="text-sm text-gray-500">Help us improve your experience</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Your Feedback</Label>
                  <Textarea placeholder="Tell us what you think..." className="min-h-[150px]" />
                </div>
                <Button>Submit Feedback</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

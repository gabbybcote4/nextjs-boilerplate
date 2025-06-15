"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUserProfile } from "@/hooks/useUserProfile"

export function PersonalInfoPage() {
  const { profile, updateProfile } = useUserProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email || "",
    bio: profile.bio || "",
  })

  const handleSave = () => {
    updateProfile({
      ...profile,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <p className="text-sm text-gray-500">Manage your personal details</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex justify-between items-center">
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
    </div>
  )
}

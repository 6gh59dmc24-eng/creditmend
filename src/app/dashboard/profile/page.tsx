"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "Test User",
    email: "test@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    dateOfBirth: "1990-01-01",
    employer: "ABC Company",
    occupation: "Software Developer",
    annualIncome: "75000",
    housingStatus: "Rent",
    maritalStatus: "Single",
    dependents: 0,
    creditGoals: ["Improve credit score", "Remove negative items", "Build credit history"]
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // TODO: Save to backend
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your basic contact and personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Financial Information
            </CardTitle>
            <CardDescription>
              Employment and financial details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employer">Employer</Label>
                <Input
                  id="employer"
                  value={formData.employer}
                  onChange={(e) => handleInputChange("employer", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="housingStatus">Housing Status</Label>
                <Input
                  id="housingStatus"
                  value={formData.housingStatus}
                  onChange={(e) => handleInputChange("housingStatus", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Input
                  id="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="dependents">Dependents</Label>
                <Input
                  id="dependents"
                  type="number"
                  value={formData.dependents}
                  onChange={(e) => handleInputChange("dependents", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Credit Goals
            </CardTitle>
            <CardDescription>
              What you want to achieve with credit repair
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.creditGoals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={!isEditing}
                    className="rounded border-gray-300"
                  />
                  <Label>{goal}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="w-full md:w-auto">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}
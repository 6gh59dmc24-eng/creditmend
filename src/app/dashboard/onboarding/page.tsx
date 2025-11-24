"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Home,
  Shield,
  CreditCard,
  FileCheck,
  AlertCircle
} from "lucide-react"

interface OnboardingData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  ssn: string
  
  // Address Information
  streetAddress: string
  city: string
  state: string
  zipCode: string
  
  // Financial Information
  employmentStatus: string
  employerName: string
  annualIncome: string
  housingStatus: string
  maritalStatus: string
  dependents: string
  
  // Credit Goals
  creditGoals: string[]
  referredBy: string
  
  // Documents
  idDocument: File | null
  proofOfAddress: File | null
  creditReport: File | null
  
  // Consents
  termsAccepted: boolean
  privacyAccepted: boolean
  creditReportAuth: boolean
  electronicSignature: string
}

const onboardingSteps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Address", icon: Home },
  { id: 3, title: "Financial Information", icon: CreditCard },
  { id: 4, title: "Credit Goals", icon: Target },
  { id: 5, title: "Document Upload", icon: Upload },
  { id: 6, title: "Consents & Signature", icon: Shield },
]

const creditGoalsOptions = [
  "Remove negative items",
  "Improve credit score",
  "Qualify for mortgage",
  "Qualify for auto loan",
  "Lower interest rates",
  "Credit monitoring",
  "Debt management",
  "Other"
]

export default function ClientOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    ssn: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    employmentStatus: "",
    employerName: "",
    annualIncome: "",
    housingStatus: "",
    maritalStatus: "",
    dependents: "",
    creditGoals: [],
    referredBy: "",
    idDocument: null,
    proofOfAddress: null,
    creditReport: null,
    termsAccepted: false,
    privacyAccepted: false,
    creditReportAuth: false,
    electronicSignature: ""
  })

  const progressPercentage = (currentStep / onboardingSteps.length) * 100

  const updateData = (field: keyof OnboardingData, value: string | boolean | File | null | string[]) => {
    setOnboardingData(prev => ({ ...prev, [field]: value }))
  }

  const toggleCreditGoal = (goal: string) => {
    setOnboardingData(prev => ({
      ...prev,
      creditGoals: prev.creditGoals.includes(goal)
        ? prev.creditGoals.filter(g => g !== goal)
        : [...prev.creditGoals, goal]
    }))
  }

  const handleFileUpload = (field: 'idDocument' | 'proofOfAddress' | 'creditReport', file: File) => {
    updateData(field, file)
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(onboardingData.firstName && onboardingData.lastName && 
                 onboardingData.email && onboardingData.phone && 
                 onboardingData.dateOfBirth && onboardingData.ssn)
      case 2:
        return !!(onboardingData.streetAddress && onboardingData.city && 
                 onboardingData.state && onboardingData.zipCode)
      case 3:
        return !!(onboardingData.employmentStatus && onboardingData.annualIncome && 
                 onboardingData.housingStatus)
      case 4:
        return onboardingData.creditGoals.length > 0
      case 5:
        return !!(onboardingData.idDocument && onboardingData.proofOfAddress)
      case 6:
        return !!(onboardingData.termsAccepted && onboardingData.privacyAccepted && 
                 onboardingData.creditReportAuth && onboardingData.electronicSignature)
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitOnboarding = () => {
    console.log("Onboarding Data:", onboardingData)
    // Here you would send the data to your API
    alert("Onboarding completed successfully!")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={onboardingData.firstName}
                  onChange={(e) => updateData('firstName', e.target.value)}
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={onboardingData.lastName}
                  onChange={(e) => updateData('lastName', e.target.value)}
                  placeholder="Smith"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={onboardingData.email}
                onChange={(e) => updateData('email', e.target.value)}
                placeholder="john.smith@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={onboardingData.phone}
                onChange={(e) => updateData('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={onboardingData.dateOfBirth}
                  onChange={(e) => updateData('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ssn">Social Security Number *</Label>
                <Input
                  id="ssn"
                  value={onboardingData.ssn}
                  onChange={(e) => updateData('ssn', e.target.value)}
                  placeholder="XXX-XX-XXXX"
                  maxLength={11}
                />
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="streetAddress">Street Address *</Label>
              <Input
                id="streetAddress"
                value={onboardingData.streetAddress}
                onChange={(e) => updateData('streetAddress', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={onboardingData.city}
                  onChange={(e) => updateData('city', e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <select
                  id="state"
                  value={onboardingData.state}
                  onChange={(e) => updateData('state', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  {/* Add all states */}
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={onboardingData.zipCode}
                onChange={(e) => updateData('zipCode', e.target.value)}
                placeholder="10001"
                maxLength={5}
              />
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="employmentStatus">Employment Status *</Label>
              <select
                id="employmentStatus"
                value={onboardingData.employmentStatus}
                onChange={(e) => updateData('employmentStatus', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="employerName">Employer Name</Label>
              <Input
                id="employerName"
                value={onboardingData.employerName}
                onChange={(e) => updateData('employerName', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            
            <div>
              <Label htmlFor="annualIncome">Annual Income *</Label>
              <select
                id="annualIncome"
                value={onboardingData.annualIncome}
                onChange={(e) => updateData('annualIncome', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Range</option>
                <option value="0-25000">Under $25,000</option>
                <option value="25000-50000">$25,000 - $50,000</option>
                <option value="50000-75000">$50,000 - $75,000</option>
                <option value="75000-100000">$75,000 - $100,000</option>
                <option value="100000+">Over $100,000</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="housingStatus">Housing Status *</Label>
                <select
                  id="housingStatus"
                  value={onboardingData.housingStatus}
                  onChange={(e) => updateData('housingStatus', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="own">Own</option>
                  <option value="rent">Rent</option>
                  <option value="live-with-family">Live with Family</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <select
                  id="maritalStatus"
                  value={onboardingData.maritalStatus}
                  onChange={(e) => updateData('maritalStatus', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="dependents">Number of Dependents</Label>
              <Input
                id="dependents"
                type="number"
                value={onboardingData.dependents}
                onChange={(e) => updateData('dependents', e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>What are your credit goals? *</Label>
              <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {creditGoalsOptions.map((goal) => (
                  <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onboardingData.creditGoals.includes(goal)}
                      onChange={() => toggleCreditGoal(goal)}
                      className="rounded"
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="referredBy">Referred By</Label>
              <Input
                id="referredBy"
                value={onboardingData.referredBy}
                onChange={(e) => updateData('referredBy', e.target.value)}
                placeholder="Who referred you to us?"
              />
            </div>
          </div>
        )
        
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>Government Issued ID *</Label>
              <p className="text-sm text-gray-600 mb-2">Driver&apos;s license, state ID, or passport</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('idDocument', e.target.files[0])}
                  className="hidden"
                  id="id-upload"
                />
                <label htmlFor="id-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800">
                    {onboardingData.idDocument ? onboardingData.idDocument.name : 'Click to upload or drag and drop'}
                  </span>
                </label>
              </div>
            </div>
            
            <div>
              <Label>Proof of Address *</Label>
              <p className="text-sm text-gray-600 mb-2">Utility bill, lease agreement, or bank statement</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('proofOfAddress', e.target.files[0])}
                  className="hidden"
                  id="address-upload"
                />
                <label htmlFor="address-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800">
                    {onboardingData.proofOfAddress ? onboardingData.proofOfAddress.name : 'Click to upload or drag and drop'}
                  </span>
                </label>
              </div>
            </div>
            
            <div>
              <Label>Credit Report (Optional)</Label>
              <p className="text-sm text-gray-600 mb-2">If you have a recent credit report, you can upload it here</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('creditReport', e.target.files[0])}
                  className="hidden"
                  id="credit-upload"
                />
                <label htmlFor="credit-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800">
                    {onboardingData.creditReport ? onboardingData.creditReport.name : 'Click to upload or drag and drop'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )
        
      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal Agreements</h3>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.termsAccepted}
                  onChange={(e) => updateData('termsAccepted', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">
                  I agree to the Terms of Service and understand the credit repair process
                </span>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.privacyAccepted}
                  onChange={(e) => updateData('privacyAccepted', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">
                  I acknowledge and agree to the Privacy Policy and how my data will be handled
                </span>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onboardingData.creditReportAuth}
                  onChange={(e) => updateData('creditReportAuth', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">
                  I authorize the company to obtain my credit reports from all three bureaus
                </span>
              </label>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Electronic Signature</h3>
              <p className="text-sm text-gray-600">
                By typing your name below, you are signing this document electronically
              </p>
              <div>
                <Label htmlFor="electronicSignature">Type your full name *</Label>
                <Input
                  id="electronicSignature"
                  value={onboardingData.electronicSignature}
                  onChange={(e) => updateData('electronicSignature', e.target.value)}
                  placeholder="John Smith"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Important Notice:</p>
                  <p>
                    Under the Credit Repair Organizations Act (CROA), you have the right to cancel 
                    this contract without penalty or obligation within 3 business days from the date 
                    you sign it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Onboarding</h1>
          <p className="text-gray-600">Complete your profile to get started with our credit repair services</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {onboardingSteps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-blue-600 bg-blue-600 text-white' :
                    isCompleted ? 'border-green-600 bg-green-600 text-white' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < onboardingSteps.length - 1 && (
                    <div className={`w-full h-1 mx-2 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-center text-sm text-gray-600 mt-2">
            Step {currentStep} of {onboardingSteps.length}: {onboardingSteps[currentStep - 1].title}
          </p>
        </div>
        
        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {(() => {
                const Icon = onboardingSteps[currentStep - 1].icon
                return <Icon className="h-6 w-6" />
              })()}
              <span>{onboardingSteps[currentStep - 1].title}</span>
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Where can we reach you?"}
              {currentStep === 3 && "Help us understand your financial situation"}
              {currentStep === 4 && "What would you like to achieve?"}
              {currentStep === 5 && "Upload the required documents"}
              {currentStep === 6 && "Review and sign the agreements"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep === onboardingSteps.length ? (
                <Button onClick={submitOnboarding} disabled={!validateStep(currentStep)}>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Complete Onboarding
                </Button>
              ) : (
                <Button onClick={nextStep} disabled={!validateStep(currentStep)}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Target({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
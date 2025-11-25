'use client';

import { useState } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  TrendingUp,
  DollarSign,
  Award,
  FileText,
  Calendar,
  CreditCard,
  Target
} from 'lucide-react';

export default function BusinessDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Business Credit Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.firstName || user?.username}</p>
              </div>
            </div>
            <SignOutButton>
              <Button variant="outline">
                Sign Out
              </Button>
            </SignOutButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Tier</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Tier 1</div>
              <p className="text-xs text-muted-foreground">Building foundation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credit Lines</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,000</div>
              <p className="text-xs text-muted-foreground">Total available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25%</div>
              <p className="text-xs text-muted-foreground">To next tier</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Credit Building Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Building Roadmap</CardTitle>
                <CardDescription>Your path to Tier 5 business credit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tier 1 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <span className="font-semibold">Tier 1: Foundation</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Complete</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <ul className="mt-2 ml-10 space-y-1 text-sm text-gray-600">
                    <li>✓ Business registration</li>
                    <li>✓ EIN obtained</li>
                    <li>✓ Business bank account</li>
                  </ul>
                </div>

                {/* Tier 2 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <span className="font-semibold">Tier 2: Starter Credit</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">In Progress</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <ul className="mt-2 ml-10 space-y-1 text-sm text-gray-600">
                    <li>✓ Net 30 vendor accounts (2/3)</li>
                    <li>⊙ DUNS number registration</li>
                    <li>⊙ Business phone & address</li>
                  </ul>
                </div>

                {/* Tier 3-5 */}
                <div className="opacity-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="font-semibold">Tier 3: Fleet Credit ($10k-$25k)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Action Items
                </CardTitle>
                <CardDescription>Complete these to advance your credit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="h-5 w-5 rounded border border-gray-300 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Complete DUNS Registration</p>
                      <p className="text-sm text-gray-600">Required for business credit reporting</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="h-5 w-5 rounded border border-gray-300 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Open 3rd Net-30 Account</p>
                      <p className="text-sm text-gray-600">Establish payment history</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="h-5 w-5 rounded border border-gray-300 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Upload Business Documents</p>
                      <p className="text-sm text-gray-600">Articles of incorporation, licenses</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Credit Report
                </Button>
                <Button className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700">
                  <Target className="h-4 w-4 mr-2" />
                  Start Onboarding
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Opportunities</CardTitle>
                <CardDescription>Based on your credit tier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium">Starter Business Cards</p>
                  <p className="text-sm text-gray-600">$2,500 - $5,000 limit</p>
                  <Button size="sm" variant="link" className="px-0">Learn more →</Button>
                </div>
                <div className="p-3 border rounded-lg opacity-60">
                  <p className="font-medium">Fleet Cards</p>
                  <p className="text-sm text-gray-600">Unlock at Tier 3</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

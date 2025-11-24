'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Target,
  Calendar,
  FileText,
  Briefcase,
  Shield
} from 'lucide-react';

export default function WealthDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/wealth/auth/signin');
    } else if (session?.user?.role !== 'WEALTH_CLIENT') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
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
              <TrendingUp className="h-8 w-8 text-emerald-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wealth Management Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {session?.user?.name}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/api/auth/signout')}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-xs text-muted-foreground">Complete onboarding to start</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">--</div>
              <p className="text-xs text-muted-foreground">Awaiting first investment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Complete risk assessment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Review</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">Schedule consultation</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Portfolio Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Complete these steps to begin your wealth journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 border-2 border-emerald-200 rounded-lg bg-emerald-50">
                    <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-900">Complete Onboarding Questionnaire</p>
                      <p className="text-sm text-emerald-700 mt-1">
                        Help us understand your financial goals, risk tolerance, and investment experience
                      </p>
                      <Button size="sm" className="mt-3 bg-emerald-600 hover:bg-emerald-700">
                        Start Onboarding
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border rounded-lg opacity-60">
                    <div className="h-6 w-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Schedule Initial Consultation</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Meet with your dedicated wealth advisor to discuss your strategy
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 border rounded-lg opacity-60">
                    <div className="h-6 w-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Fund Your Account</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Transfer funds to begin investing according to your personalized plan
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Investment Services
                </CardTitle>
                <CardDescription>Comprehensive wealth management solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <PieChart className="h-8 w-8 text-emerald-600 mb-2" />
                    <h3 className="font-semibold mb-1">Portfolio Management</h3>
                    <p className="text-sm text-gray-600">Diversified investment strategies tailored to your goals</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <Target className="h-8 w-8 text-emerald-600 mb-2" />
                    <h3 className="font-semibold mb-1">Retirement Planning</h3>
                    <p className="text-sm text-gray-600">401(k), IRA, and pension optimization</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <Shield className="h-8 w-8 text-emerald-600 mb-2" />
                    <h3 className="font-semibold mb-1">Estate Planning</h3>
                    <p className="text-sm text-gray-600">Trusts, wills, and legacy preservation</p>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <DollarSign className="h-8 w-8 text-emerald-600 mb-2" />
                    <h3 className="font-semibold mb-1">Tax Optimization</h3>
                    <p className="text-sm text-gray-600">Minimize tax burden, maximize returns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Resources */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-emerald-600 text-white hover:bg-emerald-700">
                  <Target className="h-4 w-4 mr-2" />
                  Start Onboarding
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <PieChart className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>Latest market updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Market Update</p>
                  <p className="text-xs text-gray-600 mt-1">Complete onboarding to receive personalized insights</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Advisor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  A dedicated wealth advisor will be assigned after you complete onboarding.
                </p>
                <Button variant="outline" className="w-full mt-3">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

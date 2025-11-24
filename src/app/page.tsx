import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, TrendingUp, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Credit Repair CRM
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your credit repair business with our comprehensive CRM solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Client Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Complete client profiles with onboarding workflows and document management
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Dispute Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Automated dispute generation and tracking with all three credit bureaus
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Comprehensive reporting and business insights to drive growth
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <CardTitle>Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Integrated messaging and notification system for seamless client communication
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button size="lg">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been removed, renamed, or is temporarily unavailable.
            </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>If you believe this is an error, please contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We apologize for the inconvenience. An unexpected error occurred while processing your request.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-mono text-left">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
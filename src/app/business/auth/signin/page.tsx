import { SignIn } from '@clerk/nextjs';
import { Building2 } from 'lucide-react';
import Link from 'next/link';

export default function BusinessSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md p-4">
        <div className="flex items-center justify-center mb-8">
          <Building2 className="h-10 w-10 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Credit</h1>
            <p className="text-sm text-gray-600">CreditMend Business Portal</p>
          </div>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg',
            },
          }}
          routing="path"
          path="/business/auth/signin"
          signUpUrl="/business/auth/signup"
          redirectUrl="/business/dashboard"
        />

        <div className="text-center text-sm text-gray-600 mt-4">
          Need personal credit repair?{' '}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Personal Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

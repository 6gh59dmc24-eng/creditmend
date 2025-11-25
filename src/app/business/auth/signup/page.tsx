import { SignUp } from '@clerk/nextjs';
import { Building2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BusinessSignUpPage() {
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

        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg',
            },
          }}
          routing="path"
          path="/business/auth/signup"
          signInUrl="/business/auth/signin"
          redirectUrl="/business/dashboard"
        />

        <div className="text-center text-sm text-gray-600 mt-4">
          Need personal credit repair?{' '}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Personal Portal
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <ShieldCheck className="h-4 w-4 inline mr-1" />
          Your information is encrypted and secure
        </div>
      </div>
    </div>
  );
}

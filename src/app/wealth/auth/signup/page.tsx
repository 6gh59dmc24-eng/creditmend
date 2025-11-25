import { SignUp } from '@clerk/nextjs';
import { TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function WealthSignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
      <div className="w-full max-w-md p-4">
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="h-10 w-10 text-emerald-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wealth Management</h1>
            <p className="text-sm text-gray-600">CreditMend Wealth Portal</p>
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
          path="/wealth/auth/signup"
          signInUrl="/wealth/auth/signin"
          redirectUrl="/wealth/dashboard"
        />

        <div className="text-center text-sm text-gray-600 mt-4">
          Need credit repair?{' '}
          <Link href="/auth/signup" className="text-emerald-600 hover:underline">
            Personal Portal
          </Link>
          {' | '}
          <Link href="/business/auth/signup" className="text-emerald-600 hover:underline">
            Business Portal
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

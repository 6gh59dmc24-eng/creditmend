import { SignIn } from '@clerk/nextjs';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function WealthSignInPage() {
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

        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg',
            },
          }}
          routing="path"
          path="/wealth/auth/signin"
          signUpUrl="/wealth/auth/signup"
          redirectUrl="/wealth/dashboard"
        />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { startAuthentication } from '@simplewebauthn/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasskeyLoading, setIsPasskeyLoading] = useState(false);
  const [showPasskeyEmail, setShowPasskeyEmail] = useState(false);
  const [passkeyEmail, setPasskeyEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    if (!passkeyEmail) {
      setError('Please enter your email');
      return;
    }

    setIsPasskeyLoading(true);
    setError('');

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        setError('Passkeys are not supported on this device/browser');
        setIsPasskeyLoading(false);
        return;
      }

      // Get authentication options from server
      const optionsResponse = await fetch('/api/auth/passkey/login-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: passkeyEmail }),
      });

      if (!optionsResponse.ok) {
        const error = await optionsResponse.json();
        setError(error.error || 'Failed to get login options');
        setIsPasskeyLoading(false);
        return;
      }

      const { options, rpID, userId } = await optionsResponse.json();

      // Start authentication
      const credential = await startAuthentication(options);

      // Verify credential with server
      const verifyResponse = await fetch('/api/auth/passkey/login-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential,
          rpID,
          userId,
        }),
      });

      if (!verifyResponse.ok) {
        const error = await verifyResponse.json();
        setError(error.error || 'Failed to verify passkey');
        setIsPasskeyLoading(false);
        return;
      }

      const { verified, user } = await verifyResponse.json();

      if (verified) {
        // Sign in with NextAuth using the verified user
        const result = await signIn('credentials', {
          passkeyVerified: 'true',
          userId: user.id,
          redirect: false,
        });

        if (result?.error) {
          setError('Failed to sign in');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Passkey login error:', error);
      if (error.name === 'NotAllowedError') {
        setError('Passkey authentication was cancelled');
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsPasskeyLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showPasskeyEmail ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    setShowPasskeyEmail(true);
                    setError('');
                  }}
                  type="button"
                >
                  Sign in with Passkey
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passkeyEmail">Email</Label>
                  <Input
                    id="passkeyEmail"
                    type="email"
                    value={passkeyEmail}
                    onChange={e => setPasskeyEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button
                  onClick={handlePasskeyLogin}
                  className="w-full"
                  disabled={isPasskeyLoading}
                >
                  {isPasskeyLoading ? 'Authenticating...' : 'Continue with Passkey'}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setShowPasskeyEmail(false);
                    setError('');
                  }}
                  type="button"
                >
                  Back to Password Sign In
                </Button>
              </div>
            </>
          )}

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function DebugPage() {
  const { isLoaded, userId, sessionId } = useAuth();

  useEffect(() => {
    console.log('Clerk Debug Info:', {
      isLoaded,
      userId,
      sessionId,
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set',
    });
  }, [isLoaded, userId, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Clerk Debug</h1>
        
        <div className="space-y-2">
          <p><strong>Clerk Loaded:</strong> {isLoaded ? 'Yes' : 'No'}</p>
          <p><strong>User ID:</strong> {userId || 'Not signed in'}</p>
          <p><strong>Session ID:</strong> {sessionId || 'No session'}</p>
          <p><strong>Public Key:</strong> {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set'}</p>
        </div>

        {!isLoaded && (
          <div className="mt-4 p-4 bg-yellow-100 rounded">
            <p className="text-sm">Clerk is still loading...</p>
          </div>
        )}

        {isLoaded && !userId && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <p className="text-sm">User is not signed in. Clerk is working correctly.</p>
          </div>
        )}

        {isLoaded && userId && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p className="text-sm">User is signed in. Clerk is working correctly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
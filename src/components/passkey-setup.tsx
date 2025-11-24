'use client';

import { useState } from 'react';
import { startRegistration } from '@simplewebauthn/browser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function PasskeySetup() {
  const [isSupported, setIsSupported] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegisterPasskey = async () => {
    setIsRegistering(true);
    setMessage('');

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        setIsSupported(false);
        setMessage('Passkeys are not supported on this device/browser');
        setIsRegistering(false);
        return;
      }

      // Get registration options from server
      const optionsResponse = await fetch('/api/auth/passkey/register-options');
      if (!optionsResponse.ok) {
        throw new Error('Failed to get registration options');
      }

      const { options, rpID } = await optionsResponse.json();

      // Start registration
      const credential = await startRegistration(options);

      // Send credential to server for verification
      const verifyResponse = await fetch('/api/auth/passkey/register-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential,
          rpID,
        }),
      });

      if (verifyResponse.ok) {
        setMessage('✅ Passkey registered successfully! You can now use it to sign in.');
      } else {
        const error = await verifyResponse.json();
        setMessage(`❌ Failed to register passkey: ${error.error}`);
      }
    } catch (error: any) {
      console.error('Passkey registration error:', error);
      if (error.name === 'NotAllowedError') {
        setMessage('❌ Passkey registration was cancelled');
      } else {
        setMessage(`❌ Error: ${error.message}`);
      }
    } finally {
      setIsRegistering(false);
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Passkeys Not Available</CardTitle>
          <CardDescription>
            Your browser or device doesn't support passkeys
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Up Passkey</CardTitle>
        <CardDescription>
          Use your fingerprint, face, or screen lock to sign in securely without a password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Passkeys are a more secure and convenient way to sign in. You can use:
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Face ID or Touch ID on Apple devices</li>
            <li>Windows Hello on Windows</li>
            <li>Fingerprint or face unlock on Android</li>
            <li>Security keys like YubiKey</li>
          </ul>
        </div>

        <Button
          onClick={handleRegisterPasskey}
          disabled={isRegistering}
          className="w-full"
        >
          {isRegistering ? 'Setting up...' : 'Set Up Passkey'}
        </Button>

        {message && (
          <p className={`text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

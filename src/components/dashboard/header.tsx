'use client';

import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

import { MobileSidebar } from '@/components/dashboard/mobile-sidebar';

interface HeaderProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    emailAddresses?: { emailAddress: string }[];
    role?: string;
  };
}

export function Header({ user }: HeaderProps) {
  const displayName = user.firstName || user.username || 'User';
  const email = user.emailAddresses?.[0]?.emailAddress || '';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileSidebar userRole={user.role || 'CLIENT'} />
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Welcome back, {displayName}
            </h1>
            <p className="text-xs md:text-sm text-gray-600 hidden md:block">
              {user.role === 'CLIENT'
                ? 'Client Dashboard'
                : user.role === 'ADMIN'
                  ? 'Administrator'
                  : user.role === 'MANAGER'
                    ? 'Manager'
                    : 'Agent'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {displayName}
              </p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-8 w-8',
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

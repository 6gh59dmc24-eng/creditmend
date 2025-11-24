'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, User } from 'lucide-react';

import { MobileSidebar } from '@/components/dashboard/mobile-sidebar';

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileSidebar userRole={user.role || 'CLIENT'} />
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Welcome back, {user.name || user.email}
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
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

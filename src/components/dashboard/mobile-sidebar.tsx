'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/dashboard/sidebar';
import { cn } from '@/lib/utils';

interface MobileSidebarProps {
  userRole: string;
}

export function MobileSidebar({ userRole }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Sidebar userRole={userRole} className="shadow-none w-full" />
      </div>
    </>
  );
}

'use client';

import { Card } from '@/components/ui/card';
import { ArrowUpRight, Clock, CreditCard, Layers } from 'lucide-react';

interface StatsGridProps {
  stats: {
    paymentHistory: number;
    creditCardUse: number;
    totalAccounts: number;
    creditAge: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Payment History */}
      <Card className="p-4 bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-gray-600">
            Payment history
          </span>
          <ArrowUpRight className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {stats.paymentHistory}%
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
            High impact
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Percentage of payments you've made on time
        </p>
      </Card>

      {/* Credit Card Use */}
      <Card className="p-4 bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-gray-600">
            Credit card use
          </span>
          <ArrowUpRight className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {stats.creditCardUse}%
          </span>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
            High impact
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          How much credit you're using compared to your total limits
        </p>
      </Card>

      {/* Credit Age */}
      <Card className="p-4 bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-gray-600">Credit age</span>
          <Clock className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {stats.creditAge}yrs
          </span>
          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
            Medium impact
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Average age or your open accounts
        </p>
      </Card>

      {/* Total Accounts */}
      <Card className="p-4 bg-gray-50 border-none shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-gray-600">
            Total accounts
          </span>
          <Layers className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {stats.totalAccounts}
          </span>
          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
            Low impact
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Total open and closed accounts
        </p>
      </Card>
    </div>
  );
}

'use client';

import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Account {
  id: string;
  dateOpen: string;
  name: string;
  accountNumber: string;
  balance: string;
  creditLimit: string;
  type: string;
  status: string;
}

interface AccountListProps {
  accounts: Account[];
}

export function AccountList({ accounts }: AccountListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                Date Open
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                Name
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                Account Number
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                Balance
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                Credit Limit
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                Type
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {accounts.map(account => (
              <tr
                key={account.id}
                className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{account.dateOpen}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {account.name}
                </td>
                <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                  {account.accountNumber}
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {account.balance}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {account.creditLimit}
                </td>
                <td className="px-6 py-4 text-gray-600">{account.type}</td>
                <td className="px-6 py-4 text-gray-900">{account.status}</td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

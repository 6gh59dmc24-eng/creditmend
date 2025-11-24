'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Download,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  FileText,
} from 'lucide-react';

interface Payment {
  id: number;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  method: 'credit_card' | 'bank_transfer' | 'check';
  description: string;
  invoiceUrl?: string;
}

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'past_due' | 'cancelled' | 'paused';
  amount: number;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  nextBillingDate: string;
  features: string[];
}

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'payments' | 'subscription'>(
    'payments'
  );

  const payments: Payment[] = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 199.0,
      status: 'paid',
      method: 'credit_card',
      description: 'Monthly subscription payment',
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: 199.0,
      status: 'paid',
      method: 'credit_card',
      description: 'Monthly subscription payment',
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: 199.0,
      status: 'paid',
      method: 'credit_card',
      description: 'Monthly subscription payment',
    },
    {
      id: 4,
      date: '2024-01-01',
      amount: 49.0,
      status: 'failed',
      method: 'credit_card',
      description: 'Monthly subscription payment - card declined',
    },
  ];

  const currentSubscription: Subscription = {
    id: 'sub_001',
    plan: 'Professional Plan',
    status: 'active',
    amount: 199.0,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-15',
    features: [
      'Unlimited disputes',
      'Credit report monitoring',
      'Identity theft protection',
      'Priority support',
      'Monthly credit score updates',
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'refunded':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'past_due':
        return 'text-red-600 bg-red-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
      case 'paused':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
        <Button>
          <CreditCard className="h-4 w-4 mr-2" />
          Update Payment Method
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('subscription')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subscription'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}>
            Subscription
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}>
            Payment History
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* Current Subscription */}
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>
                Your active plan and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">
                      {currentSubscription.plan}
                    </h3>
                    <p
                      className={`text-sm ${getSubscriptionStatusColor(currentSubscription.status)}`}>
                      Status: {currentSubscription.status.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ${currentSubscription.amount}
                    </div>
                    <div className="text-sm text-gray-500">
                      /{currentSubscription.billingCycle}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Next Billing Date:</span>
                    <span className="font-medium">
                      {currentSubscription.nextBillingDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Billing Cycle:</span>
                    <span className="font-medium capitalize">
                      {currentSubscription.billingCycle}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Plan Features</h4>
                  <ul className="space-y-2">
                    {currentSubscription.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Update your payment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-sm text-gray-500">
                          Expires 12/25
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Update Payment Method</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Plan</CardTitle>
                <CardDescription>
                  Upgrade or downgrade your subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                      <div className="font-medium">Basic Plan</div>
                      <div className="text-2xl font-bold">$99</div>
                      <div className="text-sm text-gray-500">/month</div>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• 5 disputes per month</li>
                        <li>• Credit report monitoring</li>
                        <li>• Email support</li>
                      </ul>
                    </div>

                    <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                      <div className="font-medium">Professional Plan</div>
                      <div className="text-2xl font-bold">$199</div>
                      <div className="text-sm text-gray-500">/month</div>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Unlimited disputes</li>
                        <li>• Credit report monitoring</li>
                        <li>• Identity theft protection</li>
                        <li>• Priority support</li>
                        <li>• Monthly credit score updates</li>
                      </ul>
                    </div>
                  </div>

                  <Button className="w-full">Change Plan</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* Payment Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Total Paid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$597.00</div>
                <p className="text-sm text-gray-500">Last 12 months</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Average Monthly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$49.75</div>
                <p className="text-sm text-gray-500">Per month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Failed Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-sm text-gray-500">Last 12 months</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Recent transactions and payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map(payment => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium">{payment.description}</div>
                        <div className="text-sm text-gray-500">
                          {payment.date}
                        </div>
                      </div>
                      <div
                        className={`text-sm ${getStatusColor(payment.status)}`}>
                        {payment.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        ${payment.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {payment.method.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Download Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoices & Receipts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.slice(0, 6).map(payment => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">
                        Invoice #{payment.id.toString().padStart(6, '0')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.date}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline">View All Invoices</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

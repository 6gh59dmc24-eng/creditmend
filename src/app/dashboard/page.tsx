import { StatsGrid } from '@/components/dashboard/stats-grid';
import { CreditScoreGauge } from '@/components/dashboard/credit-score-gauge';
import { AccountList } from '@/components/dashboard/account-list';
import { Button } from '@/components/ui/button';
import { Bell, ChevronDown } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Mock data - In a real app, this would come from your database
  const stats = {
    paymentHistory: 100,
    creditCardUse: 2,
    totalAccounts: 28,
    creditAge: 7,
  };

  const accounts = [
    {
      id: '1',
      dateOpen: '22 Jan, 2010',
      name: 'BRINKS HOME',
      accountNumber: '302852603380xxxx',
      balance: '$0',
      creditLimit: 'None',
      type: 'Open',
      status: 'Open',
    },
    {
      id: '2',
      dateOpen: '15 Mar, 2015',
      name: 'CHASE BANK',
      accountNumber: '440066112233xxxx',
      balance: '$4,250',
      creditLimit: '$15,000',
      type: 'Revolving',
      status: 'Current',
    },
    {
      id: '3',
      dateOpen: '01 Nov, 2018',
      name: 'VERIZON WIRELESS',
      accountNumber: '9876543210xxxx',
      balance: '$1,200',
      creditLimit: 'None',
      type: 'Collection',
      status: 'Derogatory',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
              <div className="w-6 h-6 bg-green-600 rounded-tr-lg rounded-bl-lg"></div>
              DisputeFox
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                className="bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-6 h-9 text-sm font-medium">
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                Disputed Items <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                Dispute Letters <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                Action Plan <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                Credit Report <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                Inquiry Helper <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                Documents <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
            </Button>
            <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
              {/* User Avatar Placeholder */}
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl font-medium text-gray-900 mb-2">
            Hello, {user?.name?.split(' ')[0] || 'Alex'}
          </h1>
          <div className="flex items-center gap-2 text-3xl font-light text-gray-600">
            Here is your credit rate <span className="text-3xl">🙂</span>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Score & Stats */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Bureau Tabs */}
            <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-100 w-fit mx-auto lg:w-full">
              <button className="flex-1 px-6 py-2 bg-white shadow-sm rounded-full text-sm font-medium text-gray-900 border border-gray-100">
                TransUnion
              </button>
              <button className="flex-1 px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                Equifax
              </button>
              <button className="flex-1 px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                Experian
              </button>
            </div>

            {/* Gauge Chart */}
            <div className="flex justify-center py-8">
              <CreditScoreGauge score={803} />
            </div>

            {/* Update Button */}
            <div className="text-center">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 h-12 text-sm font-medium w-full max-w-xs mx-auto shadow-lg shadow-gray-200/50">
                Update your credit score
              </Button>
            </div>

            {/* Stats Grid */}
            <StatsGrid stats={stats} />
          </div>

          {/* Right Column: Action Items & Accounts */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Status Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  day: 'Day 1',
                  title: 'TransUnion credit',
                  subtitle: 'monitoring activated',
                  status: 'completed',
                },
                {
                  day: 'Day 1-3',
                  title: 'Review your credit report',
                  subtitle: 'with our credit experts',
                  status: 'completed',
                },
                {
                  day: 'Day 5',
                  title: 'File reviewed by the TCP team',
                  subtitle: 'and dispute strategy developed',
                  status: 'pending',
                },
                {
                  day: 'Day 7',
                  title: 'File ready for dispute',
                  subtitle: 'and sent to bureaus',
                  status: 'pending',
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <span className="text-xs font-medium text-gray-500">
                    {item.day}
                  </span>
                  <div className="flex items-start gap-3 bg-white/50 p-3 rounded-xl border border-gray-100/50 h-full">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-white border border-gray-200'}`}>
                      {item.status === 'completed' && (
                        <div className="w-2.5 h-1.5 border-l-2 border-b-2 border-current -rotate-45 mb-0.5" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-tight mb-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-gray-500 leading-tight">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs: Negative Accounts / Business / Inquiries */}
            <div className="flex items-center gap-8 border-b border-gray-100 pb-1">
              <button className="flex items-center gap-2 pb-3 border-b-2 border-red-400 px-2">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span className="text-lg font-medium text-gray-900">
                  Negative Accounts
                </span>
              </button>
              <button className="flex items-center gap-2 pb-3 px-2 opacity-50 hover:opacity-100 transition-opacity">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                  13
                </span>
                <span className="text-lg font-medium text-gray-900">
                  Business Assistantce
                </span>
              </button>
              <button className="flex items-center gap-2 pb-3 px-2 opacity-50 hover:opacity-100 transition-opacity">
                <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-bold">
                  0
                </span>
                <span className="text-lg font-medium text-gray-900">
                  Inquiries
                </span>
              </button>
            </div>

            {/* Account Details & Overview */}
            <div className="space-y-6">
              <AccountList accounts={accounts} />

              {/* Expanded Account View (Simulated for the first item) */}
              <div className="grid grid-cols-12 gap-6 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                {/* Overview Column */}
                <div className="col-span-12 md:col-span-4 space-y-6 border-r border-gray-100 pr-6">
                  <h3 className="font-medium text-gray-900">Overview</h3>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      You've paid off 100% of the original amount.
                    </p>
                    <div className="flex gap-0.5 h-8 items-end">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-green-500 rounded-t-sm"
                          style={{ height: `${Math.random() * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Balance</p>
                      <p className="text-2xl font-bold text-gray-900">$ 0</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">
                        Highest Balance
                      </p>
                      <p className="text-xl font-bold text-gray-900">$ 49</p>
                    </div>
                  </div>
                </div>

                {/* Payment History Column */}
                <div className="col-span-12 md:col-span-5 space-y-6 border-r border-gray-100 pr-6 pl-2">
                  <h3 className="font-medium text-gray-900">Payment History</h3>
                  <p className="text-xs text-gray-500">
                    You have made 95% of payments for this account on time.
                  </p>

                  {/* History Grid */}
                  <div className="grid grid-cols-13 gap-1 text-[10px] text-gray-400 text-center">
                    <div></div>
                    {[
                      'J',
                      'F',
                      'M',
                      'A',
                      'M',
                      'J',
                      'J',
                      'A',
                      'S',
                      'O',
                      'N',
                      'D',
                    ].map(m => (
                      <div key={m}>{m}</div>
                    ))}

                    <div className="text-left">2023</div>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${i === 4 ? 'bg-red-100 text-red-500' : 'bg-green-600 text-white'}`}>
                        {i === 4 ? '✕' : '✓'}
                      </div>
                    ))}

                    <div className="text-left">2022</div>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[8px]">
                        ✓
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Column */}
                <div className="col-span-12 md:col-span-3 space-y-4 pl-2">
                  <h3 className="font-medium text-gray-900">Account Details</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account status</span>
                      <span className="font-medium text-gray-900">Open</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type</span>
                      <span className="font-medium text-gray-900">Open</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Responsibility</span>
                      <span className="font-medium text-gray-900">
                        Individual
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Remarks</span>
                      <span className="font-medium text-gray-900 text-right max-w-[100px]">
                        Dispute resolved reported by grantor
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-full h-10 text-xs font-medium mt-4">
                    Dispute
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

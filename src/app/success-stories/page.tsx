import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Quote, TrendingUp, Building2, Star, ArrowRight } from 'lucide-react';

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">CreditMend</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-sm font-medium">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                Success Stories
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Real clients, real results. Read how CreditMend has helped thousands of
                people transform their credit and achieve their financial goals.
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {/* Story 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 rounded-2xl shadow-sm border border-blue-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Sarah M.</h3>
                    <p className="text-gray-600">Personal Credit Repair Client</p>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-blue-600 mb-4" />
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "I came to CreditMend with a credit score of 520 and collections haunting
                  me from years ago. I had been denied for car loans and credit cards
                  everywhere. Within 6 months, my score jumped to 680! They removed 12
                  negative items from my report. I just bought my first car with a great
                  interest rate. I can't thank them enough!"
                </p>
                <div className="flex items-center gap-8 pt-6 border-t border-blue-200">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">+160</div>
                    <div className="text-sm text-gray-600">Points Increased</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Items Removed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">6</div>
                    <div className="text-sm text-gray-600">Months to Results</div>
                  </div>
                </div>
              </div>

              {/* Story 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 md:p-12 rounded-2xl shadow-sm border border-purple-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Marcus J.</h3>
                    <p className="text-gray-600">Business Credit Building Client</p>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-purple-600 mb-4" />
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "Starting my construction company, I was using my personal credit for
                  everything. CreditMend helped me establish separate business credit. Within
                  9 months, I had a business credit score of 85 with Dun & Bradstreet and
                  qualified for a $75,000 line of credit without a personal guarantee. This
                  changed my business completely!"
                </p>
                <div className="flex items-center gap-8 pt-6 border-t border-purple-200">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">85</div>
                    <div className="text-sm text-gray-600">D&B Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">$75K</div>
                    <div className="text-sm text-gray-600">Credit Line</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">9</div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                </div>
              </div>

              {/* Story 3 */}
              <div className="bg-gradient-to-br from-green-50 to-white p-8 md:p-12 rounded-2xl shadow-sm border border-green-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Jennifer & David L.</h3>
                    <p className="text-gray-600">Personal Credit & Home Buyers</p>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-green-600 mb-4" />
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "We were told we couldn't buy a house for at least 3 years because of our
                  credit. CreditMend gave us hope. They worked on both of our credit reports,
                  removed late payments and collections, and taught us how to rebuild. 10
                  months later, we closed on our dream home! Our realtor couldn't believe
                  the transformation."
                </p>
                <div className="flex items-center gap-8 pt-6 border-t border-green-200">
                  <div>
                    <div className="text-3xl font-bold text-green-600">+120</div>
                    <div className="text-sm text-gray-600">Average Score Increase</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">16</div>
                    <div className="text-sm text-gray-600">Total Items Removed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">10</div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                </div>
              </div>

              {/* Story 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 rounded-2xl shadow-sm border border-orange-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-orange-600 rounded-full flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Robert T.</h3>
                    <p className="text-gray-600">Business Financing Client</p>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-orange-600 mb-4" />
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "My restaurant needed equipment financing, but banks kept turning me down.
                  CreditMend not only helped clean up my personal credit, but also connected
                  me with the right lenders. I secured $150,000 in equipment financing at a
                  great rate. My business has doubled in revenue since getting that new
                  kitchen equipment!"
                </p>
                <div className="flex items-center gap-8 pt-6 border-t border-orange-200">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">$150K</div>
                    <div className="text-sm text-gray-600">Financing Secured</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">2x</div>
                    <div className="text-sm text-gray-600">Revenue Growth</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">4</div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                </div>
              </div>

              {/* Story 5 */}
              <div className="bg-gradient-to-br from-indigo-50 to-white p-8 md:p-12 rounded-2xl shadow-sm border border-indigo-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Angela P.</h3>
                    <p className="text-gray-600">Identity Theft Victim</p>
                  </div>
                </div>
                <Quote className="h-8 w-8 text-indigo-600 mb-4" />
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "I was a victim of identity theft and my credit was destroyed. I felt
                  hopeless trying to fix it myself. CreditMend took over and handled
                  everything - police reports, fraud alerts, credit bureau disputes. They
                  removed all 8 fraudulent accounts. My credit is now better than it was
                  before the theft. I'm so grateful!"
                </p>
                <div className="flex items-center gap-8 pt-6 border-t border-indigo-200">
                  <div>
                    <div className="text-3xl font-bold text-indigo-600">8</div>
                    <div className="text-sm text-gray-600">Fraud Accounts Removed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-indigo-600">100%</div>
                    <div className="text-sm text-gray-600">Issues Resolved</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-indigo-600">5</div>
                    <div className="text-sm text-gray-600">Months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of clients who have transformed their credit and achieved their
              financial goals with CreditMend.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-14 px-10">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-white" />
            <span className="font-bold text-xl text-white">CreditMend</span>
          </Link>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CreditMend. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

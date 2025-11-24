import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Building2,
  CheckCircle,
  TrendingUp,
  FileCheck,
  Award,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

export default function BusinessCreditPage() {
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
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-purple-50 to-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                Business Credit Building
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Separate your personal and business finances. Build a strong business
                credit profile to access funding without personal liability.
              </p>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="text-lg h-12 px-8 bg-purple-600 hover:bg-purple-700">
                  Build Your Business Credit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Business Credit Matters */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Business Credit Matters
              </h2>
              <p className="text-gray-600">
                A strong business credit profile opens doors to financing opportunities
                and protects your personal credit.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Separate Personal & Business
                </h3>
                <p className="text-gray-600">
                  Protect your personal credit and assets by establishing separate business
                  credit lines.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Access Better Financing
                </h3>
                <p className="text-gray-600">
                  Qualify for higher credit limits, better terms, and more financing
                  options as your business credit grows.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Build Credibility</h3>
                <p className="text-gray-600">
                  Establish your business as a credible entity with suppliers, vendors, and
                  lenders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tier System */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Business Credit Building Process
              </h2>
              <p className="text-gray-600">
                We guide you through a proven tier-by-tier approach to establish and
                strengthen your business credit profile.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Tier 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Foundation Setup
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Establish the basics required for business credit reporting.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>EIN (Employer Identification Number) registration</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Business entity formation (LLC, Corp, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Business bank account setup</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Business phone number and address</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Initial Trade Lines
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Establish starter vendor accounts that report to business credit
                      bureaus.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Net-30 vendor account establishment</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Store credit cards (Office Depot, Staples, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Fleet fuel cards (Shell, Chevron, etc.)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Credit Bureau Registration
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get your business listed with major business credit bureaus.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Dun & Bradstreet D-U-N-S Number</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Experian Business profile setup</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Equifax Business account registration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tier 4 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Revolving Credit & Funding
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Qualify for larger credit lines and business financing options.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Business credit cards (Amex, Chase, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Business lines of credit</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Term loans and equipment financing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                What You Get With CreditMend Business Credit
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <FileCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Step-by-Step Guidance</h3>
                    <p className="text-sm text-gray-600">
                      Clear instructions for each tier, from entity formation to major
                      credit lines.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Vendor Relationships</h3>
                    <p className="text-sm text-gray-600">
                      Access to our network of net-30 vendors who report to business credit
                      bureaus.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Credit Monitoring</h3>
                    <p className="text-sm text-gray-600">
                      Track your business credit scores across Dun & Bradstreet, Experian,
                      and Equifax.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Expert Support</h3>
                    <p className="text-sm text-gray-600">
                      Direct access to business credit specialists who guide you through
                      every step.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Build Business Credit?
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto mb-10">
              Start establishing your business credit profile today and unlock access to
              funding without personal liability.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg h-14 px-10">
                Get Started Now
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

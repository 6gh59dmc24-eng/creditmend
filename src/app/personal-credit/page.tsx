import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  TrendingUp,
  CheckCircle,
  FileText,
  BarChart3,
  Users,
  ArrowRight,
} from 'lucide-react';

export default function PersonalCreditPage() {
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
                Personal Credit Repair
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Take control of your financial future. We help you identify and dispute
                errors, remove negative items, and build a stronger credit profile.
              </p>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="text-lg h-12 px-8 bg-blue-600 hover:bg-blue-700">
                  Start Your Credit Repair Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Personal Credit Repair Works
              </h2>
              <p className="text-gray-600">
                Our proven 4-step process has helped thousands improve their credit scores
                and achieve their financial goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Analysis</h3>
                <p className="text-gray-600">
                  We pull and thoroughly review your credit reports from all three bureaus
                  to identify errors and negative items.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Strategy</h3>
                <p className="text-gray-600">
                  Our experts create a personalized action plan targeting the items that
                  have the biggest impact on your score.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Disputes</h3>
                <p className="text-gray-600">
                  We file disputes with credit bureaus and creditors on your behalf,
                  following all federal regulations.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Results</h3>
                <p className="text-gray-600">
                  Track your progress with real-time updates as negative items are removed
                  and your score improves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Fix */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                What We Can Help You Fix
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Late Payments</h3>
                  <p className="text-sm text-gray-600">
                    Dispute inaccurate late payment reports that are damaging your credit
                    score.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Collections</h3>
                  <p className="text-sm text-gray-600">
                    Remove invalid or incorrect collection accounts from your credit
                    report.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Charge-Offs</h3>
                  <p className="text-sm text-gray-600">
                    Challenge charge-offs that are reported incorrectly or are past the
                    reporting period.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Identity Theft</h3>
                  <p className="text-sm text-gray-600">
                    Remove fraudulent accounts and inquiries resulting from identity theft.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Bankruptcies</h3>
                  <p className="text-sm text-gray-600">
                    Challenge incorrectly reported bankruptcy information or outdated
                    entries.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Hard Inquiries</h3>
                  <p className="text-sm text-gray-600">
                    Remove unauthorized hard inquiries that you didn't approve or
                    authorize.
                  </p>
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
                Why Choose CreditMend for Personal Credit Repair?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      FCRA Compliant Process
                    </h3>
                    <p className="text-gray-600">
                      We follow all Fair Credit Reporting Act guidelines to ensure your
                      disputes are handled legally and effectively.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Expert Support Team</h3>
                    <p className="text-gray-600">
                      Our certified credit consultants have years of experience and are
                      dedicated to your success.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Real-Time Progress Tracking
                    </h3>
                    <p className="text-gray-600">
                      Access your dashboard 24/7 to monitor disputes, view updates, and
                      track your credit score improvements.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">No Hidden Fees</h3>
                    <p className="text-gray-600">
                      Transparent pricing with no setup fees or hidden charges. Cancel
                      anytime without penalty.
                    </p>
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
              Ready to Rebuild Your Credit?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Join thousands who have successfully improved their credit scores with
              CreditMend. Start your journey today.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-14 px-10">
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

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  TrendingUp,
  Building2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">CreditMend</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#personal"
              className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Personal Credit
            </Link>
            <Link
              href="#business"
              className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Business Credit
            </Link>
            <Link
              href="#financing"
              className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Financing
            </Link>
          </nav>
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
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                Rebuild Your Credit. <br />
                <span className="text-blue-600">Secure Your Future.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We help individuals rebuild their personal credit profiles and
                empower small businesses to establish strong credit scores and
                access the financing they need to grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg h-12 px-8 bg-blue-600 hover:bg-blue-700">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-lg h-12 px-8">
                    How it Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Decorative background blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl mix-blend-multiply filter" />
            <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-purple-200 rounded-full blur-3xl mix-blend-multiply filter" />
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comprehensive Credit Solutions
              </h2>
              <p className="text-gray-600">
                Whether you're an individual looking to improve your score or a
                business seeking capital, we have the expertise to help.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Personal Credit */}
              <div
                id="personal"
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Personal Credit Repair
                </h3>
                <p className="text-gray-600 mb-6">
                  We analyze your credit reports, identify inaccuracies, and
                  dispute negative items to help boost your personal credit
                  score effectively.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Error dispute & correction
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Score monitoring & tracking
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Personalized action plans
                  </li>
                </ul>
              </div>

              {/* Business Credit */}
              <div
                id="business"
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Business Credit Building
                </h3>
                <p className="text-gray-600 mb-6">
                  Separate your personal liability by establishing a robust
                  business credit profile. We guide you through the
                  tier-building process.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    EIN & Entity setup guidance
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Trade line establishment
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Dun & Bradstreet registration
                  </li>
                </ul>
              </div>

              {/* Financing */}
              <div
                id="financing"
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Business Financing
                </h3>
                <p className="text-gray-600 mb-6">
                  Access the capital you need. We match your business with
                  lenders and financing options tailored to your credit profile
                  and needs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Business loans & lines of credit
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Equipment financing
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SBA loan assistance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of individuals and business owners who have
              successfully rebuilt their credit with CreditMend.
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

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="h-6 w-6 text-white" />
                <span className="font-bold text-xl text-white">CreditMend</span>
              </div>
              <p className="text-sm">
                Empowering financial freedom through professional credit repair
                and business financing solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#personal" className="hover:text-white">
                    Personal Credit
                  </Link>
                </li>
                <li>
                  <Link href="#business" className="hover:text-white">
                    Business Credit
                  </Link>
                </li>
                <li>
                  <Link href="#financing" className="hover:text-white">
                    Financing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} CreditMend. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

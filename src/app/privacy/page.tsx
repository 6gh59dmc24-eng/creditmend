import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto prose prose-gray">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-sm text-gray-600 mb-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  CreditMend ("we," "our," or "us") is committed to protecting your privacy and
                  ensuring the security of your personal information. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when
                  you visit our website creditmend.org and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  Personal Information
                </h3>
                <p>We may collect personally identifiable information that you voluntarily provide to us, including:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Name, email address, phone number, and mailing address</li>
                  <li>Social Security Number (for credit reporting purposes)</li>
                  <li>Date of birth and employment information</li>
                  <li>Credit report information and financial data</li>
                  <li>Payment and billing information</li>
                  <li>Account credentials and authentication information</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>IP address, browser type, and device information</li>
                  <li>Usage data, including pages visited and time spent</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. How We Use Your Information
                </h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Provide credit repair, business credit building, and financing services</li>
                  <li>Process and manage your account and transactions</li>
                  <li>Communicate with you about our services and your account</li>
                  <li>Analyze and dispute inaccurate items on your credit reports</li>
                  <li>Improve our services and develop new features</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                  <li>Send you marketing communications (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. How We Share Your Information
                </h2>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>
                    <strong>Credit Bureaus:</strong> To obtain credit reports and file disputes
                    on your behalf
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who assist us in
                    providing our services
                  </li>
                  <li>
                    <strong>Financial Institutions:</strong> When facilitating business financing
                    or credit applications
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> When required by law or to protect our
                    rights
                  </li>
                  <li>
                    <strong>Business Partners:</strong> With your consent, for coordinated
                    services
                  </li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal information to third parties for their marketing
                  purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Data Security
                </h2>
                <p>
                  We implement industry-standard security measures to protect your personal
                  information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure servers and network infrastructure</li>
                  <li>Regular security audits and assessments</li>
                  <li>Strict access controls and employee training</li>
                  <li>Compliance with GLBA (Gramm-Leach-Bliley Act) safeguards</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the internet is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Access and obtain a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information (subject to legal exceptions)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Restrict or object to certain processing of your information</li>
                  <li>Data portability where applicable</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@creditmend.org or (888)
                  555-1234.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze
                  usage, and provide personalized content. You can control cookies through your
                  browser settings, but disabling cookies may limit your ability to use certain
                  features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under 18 years of age. We do not
                  knowingly collect personal information from children. If we become aware that
                  we have collected information from a child, we will delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any
                  material changes by posting the new policy on this page and updating the "Last
                  Updated" date. Your continued use of our services after changes constitute
                  acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  10. State-Specific Rights
                </h2>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  California Residents (CCPA/CPRA)
                </h3>
                <p>
                  California residents have additional rights including the right to know what
                  personal information is collected, the right to delete, the right to opt-out of
                  sales, and the right to non-discrimination.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  Other State Privacy Laws
                </h3>
                <p>
                  Residents of Virginia, Colorado, Connecticut, and other states with
                  comprehensive privacy laws have similar rights. Contact us to exercise your
                  rights under applicable state law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy or our data
                  practices, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mt-4">
                  <p className="font-semibold">CreditMend</p>
                  <p>123 Financial Way, Suite 500</p>
                  <p>New York, NY 10001</p>
                  <p>Email: privacy@creditmend.org</p>
                  <p>Phone: (888) 555-1234</p>
                </div>
              </section>
            </div>
          </div>
        </div>
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

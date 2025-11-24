import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export default function TermsOfServicePage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-sm text-gray-600 mb-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using CreditMend's website and services ("Services"), you agree
                  to be bound by these Terms of Service ("Terms"). If you do not agree to these
                  Terms, please do not use our Services. We reserve the right to modify these
                  Terms at any time, and your continued use constitutes acceptance of any
                  changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Description of Services
                </h2>
                <p>
                  CreditMend provides credit repair, business credit building, and business
                  financing services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Credit report analysis and dispute processing</li>
                  <li>Credit bureau communication on your behalf</li>
                  <li>Business credit profile establishment</li>
                  <li>Financing application assistance and lender matching</li>
                  <li>Credit monitoring and educational resources</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
                <p>You must be:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>At least 18 years of age</li>
                  <li>A legal resident of the United States</li>
                  <li>Capable of entering into a legally binding agreement</li>
                  <li>
                    Authorized to use the information provided for credit repair purposes
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. Your Rights Under CROA
                </h2>
                <p>
                  The Credit Repair Organizations Act (CROA) provides you with important rights
                  and protections:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>
                    You have the right to cancel your contract with us within 3 business days of
                    signing
                  </li>
                  <li>We cannot charge you until services are performed</li>
                  <li>You have the right to dispute inaccurate information yourself</li>
                  <li>
                    Credit bureaus must remove or correct inaccurate, incomplete, or unverifiable
                    information
                  </li>
                  <li>You cannot be charged for information readily available to you</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Service Agreement and Fees
                </h2>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Payment Terms</h3>
                <p>
                  By enrolling in our Services, you agree to pay the fees outlined in your
                  service agreement. Fees may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Monthly service fees for credit repair services</li>
                  <li>One-time setup or consultation fees</li>
                  <li>Business credit building program fees</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Refunds</h3>
                <p>
                  Refund policies are detailed in your service agreement. You may cancel within 3
                  business days for a full refund as required by CROA.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Cancellation</h3>
                <p>
                  You may cancel your services at any time by providing written notice. No
                  refunds will be issued for services already performed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  6. Client Responsibilities
                </h2>
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Provide accurate and complete information</li>
                  <li>Respond promptly to requests for documentation</li>
                  <li>Not engage in fraudulent or illegal activities</li>
                  <li>
                    Review and verify all credit report information we provide to you
                  </li>
                  <li>Notify us immediately of any changes to your contact information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  7. No Guaranteed Results
                </h2>
                <p>
                  While we work diligently to improve your credit, we cannot guarantee specific
                  results. Credit repair outcomes depend on many factors including the accuracy
                  of information, creditor responses, and credit bureau decisions. Past results
                  are not indicative of future performance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  8. Disclaimer of Warranties
                </h2>
                <p>
                  Our Services are provided "as is" and "as available" without warranties of any
                  kind, either express or implied, including but not limited to warranties of
                  merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by law, CreditMend shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, including
                  but not limited to loss of profits, data, or other intangible losses, arising
                  from:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Your use or inability to use our Services</li>
                  <li>Unauthorized access to your account or information</li>
                  <li>Errors, mistakes, or inaccuracies in content</li>
                  <li>Actions or decisions made based on our Services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless CreditMend, its officers, directors,
                  employees, and agents from any claims, damages, losses, liabilities, and
                  expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Your violation of these Terms</li>
                  <li>Your use of our Services</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Any fraudulent or illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  11. Confidentiality
                </h2>
                <p>
                  We maintain strict confidentiality of your personal and financial information
                  in accordance with our Privacy Policy and applicable laws, including GLBA
                  (Gramm-Leach-Bliley Act) and FCRA (Fair Credit Reporting Act).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  12. Dispute Resolution
                </h2>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Arbitration</h3>
                <p>
                  Any disputes arising from these Terms or our Services shall be resolved through
                  binding arbitration in accordance with the rules of the American Arbitration
                  Association, except where prohibited by law.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                  Class Action Waiver
                </h3>
                <p>
                  You agree to resolve disputes on an individual basis and waive any right to
                  participate in class action lawsuits or class-wide arbitration.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of
                  the State of New York, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Compliance</h2>
                <p>Our Services comply with:</p>
                <ul className="list-disc pl-6 space-y-2 my-4">
                  <li>Credit Repair Organizations Act (CROA)</li>
                  <li>Fair Credit Reporting Act (FCRA)</li>
                  <li>Gramm-Leach-Bliley Act (GLBA)</li>
                  <li>State-specific credit repair regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that
                  provision shall be limited or eliminated to the minimum extent necessary so
                  that these Terms shall otherwise remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
                <p>
                  For questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mt-4">
                  <p className="font-semibold">CreditMend</p>
                  <p>123 Financial Way, Suite 500</p>
                  <p>New York, NY 10001</p>
                  <p>Email: legal@creditmend.org</p>
                  <p>Phone: (888) 555-1234</p>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Consumer Notice Required by CROA
                </h2>
                <p className="font-semibold mb-2">
                  You have the right to dispute inaccurate information in your credit report by
                  contacting the credit bureau directly.
                </p>
                <p>
                  You may obtain a free copy of your credit report from each of the three major
                  credit bureaus once every 12 months by visiting{' '}
                  <a
                    href="https://www.annualcreditreport.com"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer">
                    www.annualcreditreport.com
                  </a>
                  .
                </p>
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

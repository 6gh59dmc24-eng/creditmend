import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import {
  GoogleAnalyticsScript,
  PerformanceMonitor,
} from '@/components/analytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Credit Repair CRM',
  description:
    'Professional credit repair business management system with client management, dispute tracking, and analytics',
  url: 'https://creditrepaircrm.com',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '99',
    priceCurrency: 'USD',
    priceValidUntil: '2025-12-31',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
  creator: {
    '@type': 'Organization',
    name: 'Credit Repair CRM',
    url: 'https://creditrepaircrm.com',
  },
};

export const metadata: Metadata = {
  title: {
    default:
      'Credit Repair CRM - Professional Credit Repair Business Management',
    template: '%s | Credit Repair CRM',
  },
  description:
    'Streamline your credit repair business with our comprehensive CRM solution. Manage clients, track disputes, automate workflows, and grow your business with powerful analytics.',
  keywords: [
    'credit repair CRM',
    'credit repair software',
    'credit repair business management',
    'client management',
    'dispute tracking',
    'credit repair automation',
    'credit bureau disputes',
    'credit repair business tools',
  ],
  authors: [{ name: 'Credit Repair CRM' }],
  creator: 'Credit Repair CRM',
  publisher: 'Credit Repair CRM',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://creditrepaircrm.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creditrepaircrm.com',
    title: 'Credit Repair CRM - Professional Credit Repair Business Management',
    description:
      'Streamline your credit repair business with our comprehensive CRM solution. Manage clients, track disputes, and grow your business.',
    siteName: 'Credit Repair CRM',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Credit Repair CRM - Professional Credit Repair Business Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Repair CRM - Professional Credit Repair Business Management',
    description:
      'Streamline your credit repair business with our comprehensive CRM solution.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalyticsScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <PerformanceMonitor />
      </body>
    </html>
  );
}

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      // Google Analytics 4
      const gtag = function(...args: unknown[]) {
        const dataLayer = (window as any).dataLayer || []
        dataLayer.push(args)
      }
      
      // Initialize GA4
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname + searchParams.toString(),
      })
      
      // Track page views
      gtag('event', 'page_view', {
        page_path: pathname + searchParams.toString(),
      })
    }
  }, [pathname, searchParams])

  return null
}

// Google Analytics Script Component
export function GoogleAnalyticsScript() {
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return null
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />
    </>
  )
}

// Performance Monitoring
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
          }
          if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as any
            if (!clsEntry.hadRecentInput) {
              console.log('CLS:', clsEntry.value)
            }
          }
        }
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      
      return () => observer.disconnect()
    }
  }, [])

  return null
}
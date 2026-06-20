import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Bible Study — OCIA Catholic Companion',
  description: 'Sunday readings, Mass guidance, and faith formation — thoughtfully designed for anyone drawn to the Catholic tradition.',
  metadataBase: new URL('https://app.biblestudylovesyou.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://app.biblestudylovesyou.com',
    title: 'Bible Study — OCIA Catholic Companion',
    description: 'Sunday readings, Mass guidance, and faith formation — thoughtfully designed for anyone drawn to the Catholic tradition.',
    images: [{ url: '/apple-touch-icon.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'Bible Study — OCIA Catholic Companion',
    description: 'Sunday readings, Mass guidance, and faith formation — thoughtfully designed for anyone drawn to the Catholic tradition.',
    images: ['/apple-touch-icon.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
    apple: '/apple-touch-icon.png',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a18' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Bible Study',
  url: 'https://app.biblestudylovesyou.com',
  description: 'Sunday readings, Mass guidance, and faith formation — thoughtfully designed for anyone drawn to the Catholic tradition.',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-DD8L2T25FQ" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-DD8L2T25FQ');
      `}</Script>
      <body className="bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

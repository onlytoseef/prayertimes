import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

// Comprehensive SEO Metadata - Keywords researched for prayer times niche
export const metadata: Metadata = {
  metadataBase: new URL('https://prayertimes.com'),
  title: {
    default: 'أوقات الصلاة | Prayer Times - Accurate Islamic Prayer Times Worldwide',
    template: '%s | أوقات الصلاة Prayer Times'
  },
  description: 'أوقات الصلاة الدقيقة لجميع مدن العالم - Accurate Islamic prayer times (Salah times) for Makkah, Madinah, and cities worldwide. Find Fajr, Dhuhr, Asr, Maghrib, Isha times with Hijri calendar. مواقيت الصلاة الإسلامية',
  authors: [{ name: 'Prayer Times Team' }],
  creator: 'Prayer Times',
  publisher: 'Prayer Times',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US', 'ur_PK'],
    url: 'https://prayertimes.com',
    title: 'أوقات الصلاة | Prayer Times - Accurate Islamic Prayer Times',
    description: 'Accurate Islamic prayer times for Makkah, Madinah, and cities worldwide. Hijri calendar and prayer schedules.',
    siteName: 'Prayer Times',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Prayer Times - Islamic Prayer Schedule'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أوقات الصلاة | Prayer Times',
    description: 'Accurate Islamic prayer times worldwide with Hijri calendar',
    images: ['/twitter-image.jpg'],
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
  alternates: {
    canonical: 'https://prayertimes.com',
    languages: {
      'ar': 'https://prayertimes.com/',
      'en': 'https://prayertimes.com/en',
      'ur': 'https://prayertimes.com/ur',
      'de': 'https://prayertimes.com/de',
      'fr': 'https://prayertimes.com/fr',
      'es': 'https://prayertimes.com/es',
      'fa': 'https://prayertimes.com/fa',
      'id': 'https://prayertimes.com/id',
      'tr': 'https://prayertimes.com/tr',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#047857" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

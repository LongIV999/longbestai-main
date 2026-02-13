import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StickyCta } from "@/components/sticky-cta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://longbestai.com'),
  title: {
    default: 'LongBestAI - AI Learning & Resources',
    template: '%s | LongBestAI',
  },
  description: 'Nền tảng học AI, khóa học, deals và cơ hội việc làm',
  keywords: ['AI', 'Machine Learning', 'Automation', 'OpenClaw'],

  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://longbestai.com',
    siteName: 'LongBestAI',
    title: 'LongBestAI - AI Learning & Resources',
    description: 'Nền tảng học AI, khóa học, deals và cơ hội việc làm',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LongBestAI',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LongBestAI',
    description: 'Nền tảng học AI, khóa học, deals và cơ hội việc làm',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="official-light"
          themes={["official-light", "dark-aurora", "bridge-brutal"]}
          enableSystem={false}
          storageKey="longbest-theme"
        >
          {children}
          <StickyCta />
        </ThemeProvider>
      </body>
    </html>
  );
}

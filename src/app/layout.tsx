import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { CosmicStarsBackground } from '@/components/ui/CosmicStarsBackground';
import { BreakingStarCursor } from '@/components/ui/BreakingStarCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BreakX | Digital Transformation Studio & AI Engineering',
  description:
    'BreakX is a high-performance digital transformation studio engineering premium web applications, bespoke AI solutions, and automated enterprise workflows for ambitious brands.',
  keywords: ['Digital Studio', 'Web Development', 'AI Engineering', 'Automation', 'UI/UX Design', 'Next.js', 'WebGL Shaders'],
  openGraph: {
    title: 'BreakX | Break The Ordinary',
    description: 'High-performance digital transformation studio building premium websites and AI solutions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="bg-background text-slate-100 min-h-screen flex flex-col antialiased selection:bg-primary-500 selection:text-white relative">
        <CosmicStarsBackground />
        <BreakingStarCursor />
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

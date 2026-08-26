import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { CosmicStarsBackground } from '@/components/ui/CosmicStarsBackground';
import { NeonCursorGlow } from '@/components/ui/NeonCursorGlow';

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
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Immediate client script to prevent theme flash (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('breakx_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen flex flex-col antialiased selection:bg-primary-500 selection:text-white relative transition-colors duration-300">
        <ThemeProvider>
          <CosmicStarsBackground />
          <NeonCursorGlow />
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

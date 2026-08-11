import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { DocsSearchDialog } from '@/components/docs-search-dialog';
import { Intercom } from '@/components/intercom';
import { PostHogProvider } from '@/components/posthog-provider';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

// global.css declares `--font-mono: 'JetBrains Mono', …` but never loaded it,
// so code silently fell back to system mono. Load it like Inter/Playfair.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const siteDescription =
  'DontDieFishing documentation — find safe fishing spots with real-time water conditions, weather, and hazard data.';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.dontdiefishing.com'),
  applicationName: 'DontDieFishing Docs',
  title: {
    default: 'DontDieFishing Docs',
    template: '%s · DontDieFishing Docs',
  },
  description: siteDescription,
  category: 'technology',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'DontDieFishing Docs',
    title: { default: 'DontDieFishing Docs', template: '%s · DontDieFishing Docs' },
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: { default: 'DontDieFishing Docs', template: '%s · DontDieFishing Docs' },
    description: siteDescription,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body className={[inter.variable, playfair.variable, jetbrainsMono.variable].join(' ')}>
        <PostHogProvider>
          <RootProvider search={{ SearchDialog: DocsSearchDialog }} theme={{ defaultTheme: 'dark' }}>
            {children}
          </RootProvider>
          <Intercom />
        </PostHogProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNavigation from '@/components/navigation/SiteNavigation';
import { LocaleProvider } from '@/lib/i18n/LocaleProvider';
import './globals.css';
import '@/styles/responsive.css';
import '@/styles/navigation-responsive.css';

export const metadata: Metadata = {
  title: {
    default: 'Catholic Knowledge',
    template: '%s · Catholic Knowledge',
  },
  description: 'A visual, source-backed Catholic knowledge atlas connecting Scripture, saints, doctrine, history, liturgy and places.',
  applicationName: 'Catholic Knowledge',
  category: 'education',
};

function BrandMark() {
  return <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2" opacity=".45"/>
    <path d="M16 6v20M10 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 22c3-2 6-3 9-3s6 1 9 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".65"/>
  </svg>;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <div className="shell">
            <header className="site-header">
              <div className="container nav">
                <Link className="brand" href="/" aria-label="Catholic Knowledge home">
                  <span className="brand-mark"><BrandMark /></span>
                  <span className="brand-copy"><strong>Catholic Knowledge</strong><small>Visual faith atlas</small></span>
                </Link>
                <SiteNavigation />
              </div>
            </header>
            <main>{children}</main>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}

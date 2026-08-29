import type { Metadata } from 'next';
import Link from 'next/link';
import LanguageSwitch from '@/components/i18n/LanguageSwitch';
import { LocaleProvider } from '@/lib/i18n/LocaleProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Catholic Knowledge',
  description: 'A visual, source-backed Catholic knowledge atlas.',
};

const navItems = [
  ['Discover', '/'],
  ['Explore', '/explore'],
  ['Learn', '/learn'],
  ['Timeline', '/timeline'],
  ['Scripture', '/scripture'],
  ['Ask', '/ask'],
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <div className="shell">
            <header className="site-header">
              <div className="container nav">
                <Link className="brand" href="/" aria-label="Catholic Knowledge home">
                  <span className="brand-mark" aria-hidden="true">✦</span>
                  <span>Catholic Knowledge</span>
                </Link>
                <nav className="nav-links" aria-label="Primary navigation">
                  {navItems.map(([label, href]) => (
                    <Link key={href} href={href}>{label}</Link>
                  ))}
                </nav>
                <div className="nav-actions">
                  <LanguageSwitch />
                  <Link className="btn btn-primary" href="/explore">Explore</Link>
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}

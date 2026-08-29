'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitch from '@/components/i18n/LanguageSwitch';
import { useLocale } from '@/lib/i18n/LocaleProvider';

type IconName = 'compass' | 'book' | 'cross' | 'timeline' | 'church' | 'map' | 'spark';

const navItems = [
  { en: 'Explore', vi: 'Khám phá', enHref: '/explore', viHref: '/kham-pha', icon: 'compass' },
  { en: 'Scripture', vi: 'Kinh Thánh', enHref: '/scripture', viHref: '/kinh-thanh', icon: 'book' },
  { en: 'Doctrine', vi: 'Giáo lý', enHref: '/doctrine', viHref: '/giao-ly', icon: 'cross' },
  { en: 'Timeline', vi: 'Lịch sử', enHref: '/timeline', viHref: '/lich-su-giao-hoi', icon: 'timeline' },
  { en: 'Liturgy', vi: 'Phụng vụ', enHref: '/liturgy', viHref: '/phung-vu', icon: 'church' },
  { en: 'Places', vi: 'Địa điểm', enHref: '/places', viHref: '/dia-diem', icon: 'map' },
  { en: 'Ask', vi: 'Hỏi đáp', enHref: '/ask', viHref: '/hoi-dap', icon: 'spark' },
] as const;

function NavIcon({ name }: { name: IconName }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  if (name === 'compass') return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>;
  if (name === 'book') return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"/></svg>;
  if (name === 'cross') return <svg {...common}><path d="M12 3v18M7 8h10"/></svg>;
  if (name === 'timeline') return <svg {...common}><path d="M5 5v14M5 7h5M5 12h9M5 17h12"/><circle cx="11" cy="7" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="18" cy="17" r="1"/></svg>;
  if (name === 'church') return <svg {...common}><path d="M12 3v4M10 5h4M6 21V10l6-4 6 4v11M9 21v-5h6v5M4 21h16"/></svg>;
  if (name === 'map') return <svg {...common}><path d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2V6Z"/><path d="M8 4v13M16 7v13"/></svg>;
  return <svg {...common}><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"/><path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/></svg>;
}

export default function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const isVi = locale === 'vi';
  const journeyHref = isVi ? '/hanh-trinh/tu-chua-giesu-den-nixea' : '/learn/jesus-to-nicaea';
  return <>
    <nav className="nav-links" aria-label={isVi ? 'Điều hướng chính' : 'Primary navigation'}>
      {navItems.map((item) => <Link key={item.enHref} href={isVi ? item.viHref : item.enHref}><NavIcon name={item.icon}/><span>{item[locale]}</span></Link>)}
    </nav>
    <div className="nav-actions">
      <LanguageSwitch />
      <Link className="btn btn-primary nav-journey" href={journeyHref}>{isVi ? 'Hành trình' : 'Start a journey'}</Link>
      <button className="mobile-menu-trigger" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? (isVi ? 'Đóng điều hướng' : 'Close navigation') : (isVi ? 'Mở điều hướng' : 'Open navigation')} onClick={() => setOpen((value) => !value)}><span/><span/><span/></button>
    </div>
    {open && <div className="mobile-nav-backdrop" onClick={() => setOpen(false)}>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label={isVi ? 'Điều hướng di động' : 'Mobile navigation'} onClick={(event) => event.stopPropagation()}>
        <div className="mobile-navigation-head"><strong>{isVi ? 'Khám phá Công giáo' : 'Explore Catholic Knowledge'}</strong><button type="button" aria-label={isVi ? 'Đóng điều hướng' : 'Close navigation'} onClick={() => setOpen(false)}>×</button></div>
        <div className="mobile-navigation-grid">
          {navItems.map((item) => <Link key={item.enHref} href={isVi ? item.viHref : item.enHref} onClick={() => setOpen(false)}><NavIcon name={item.icon}/><span>{item[locale]}</span></Link>)}
          <Link href={isVi ? '/cong-dong/nixea' : '/councils/nicaea'} onClick={() => setOpen(false)}><NavIcon name="church"/><span>{isVi ? 'Công đồng Nixêa' : 'Council of Nicaea'}</span></Link>
          <Link href={isVi ? '/cac-thanh/augustino-thanh-hippo' : '/saints/augustine-of-hippo'} onClick={() => setOpen(false)}><NavIcon name="spark"/><span>{isVi ? 'Thánh Augustinô' : 'St. Augustine'}</span></Link>
          <Link href={isVi ? '/thieu-nhi' : '/kids'} onClick={() => setOpen(false)}><NavIcon name="spark"/><span>{isVi ? 'Thiếu nhi' : 'Kids'}</span></Link>
        </div>
        <Link className="btn btn-primary mobile-journey" href={journeyHref} onClick={() => setOpen(false)}>{isVi ? 'Bắt đầu hành trình học →' : 'Start the Jesus → Nicaea journey'}</Link>
      </nav>
    </div>}
  </>;
}

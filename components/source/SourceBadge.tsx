import type { CSSProperties, ReactNode } from 'react';
import type { Source } from '@/lib/knowledge/types';

const badgeStyle: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 999,
  border: '1px solid #d8c9b0', background: '#fffaf1', color: '#17314f', fontSize: 11, lineHeight: 1.2,
};
const dotStyle: CSSProperties = { width: 7, height: 7, borderRadius: '50%', background: '#b48a3c', flex: '0 0 auto' };
const licenseStyle: CSSProperties = { color: '#8a7350', fontSize: 9, textTransform: 'uppercase', letterSpacing: '.06em' };

export default function SourceBadge({ source, compact = false }: { source: Source; compact?: boolean }) {
  const label = compact ? source.publisher ?? source.title : source.title;
  const body: ReactNode = <span style={badgeStyle}><span style={dotStyle} aria-hidden="true"/><span>{label}</span>{source.license && <small style={licenseStyle}>{source.license}</small>}</span>;
  return source.url ? <a href={source.url} target="_blank" rel="noreferrer" aria-label={`${source.title} source`}>{body}</a> : body;
}

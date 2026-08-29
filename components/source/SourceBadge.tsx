import type { Source } from '@/lib/knowledge/types';

export default function SourceBadge({ source, compact = false }: { source: Source; compact?: boolean }) {
  const label = compact ? source.publisher ?? source.title : source.title;
  const body = <span className="source-badge"><span className="source-badge-dot" aria-hidden="true"/><span>{label}</span>{source.license && <small>{source.license}</small>}</span>;
  return source.url ? <a className="source-badge-link" href={source.url} target="_blank" rel="noreferrer" aria-label={`${source.title} source`}>{body}</a> : body;
}

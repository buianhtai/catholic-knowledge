'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getEditorialAsset } from '@/lib/media/assets';

type Props = {
  assetId: string;
  height?: number | string;
  radius?: number;
  objectPosition?: string;
  showCredit?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw';

export default function EditorialArtwork({
  assetId,
  height = 320,
  radius = 18,
  objectPosition,
  showCredit = true,
  className,
  sizes = DEFAULT_SIZES,
  priority = false,
}: Props) {
  const asset = getEditorialAsset(assetId);
  const [failed, setFailed] = useState(false);
  if (!asset) return null;

  const position = objectPosition ?? asset.focalPoint ?? 'center';

  return (
    <figure className={className} style={{ margin: 0, position: 'relative' }}>
      {failed ? (
        <div
          role="img"
          aria-label={asset.alt.vi ?? asset.alt.en}
          style={{
            display: 'grid',
            width: '100%',
            height,
            placeItems: 'center',
            padding: 18,
            borderRadius: radius,
            background: 'linear-gradient(135deg,#e9dfce,#f7f0e5)',
            border: '1px solid #d7c8b0',
            color: '#5f6870',
            textAlign: 'center',
            font: '13px/1.45 Georgia,serif',
          }}
        >
          <span>Hình ảnh tạm thời không tải được<br/><small>{asset.alt.vi ?? asset.alt.en}</small></span>
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden', borderRadius: radius, background: '#e9dfce' }}>
          <Image
            src={asset.localSrc ?? asset.src}
            alt={asset.alt.vi ?? asset.alt.en}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setFailed(true)}
            style={{ objectFit: 'cover', objectPosition: position }}
          />
        </div>
      )}
      {!failed && showCredit && asset.sourceUrl ? (
        <figcaption
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            maxWidth: 'calc(100% - 20px)',
            padding: '5px 8px',
            borderRadius: 999,
            background: 'rgba(5, 23, 41, .78)',
            color: '#fff',
            fontSize: 10,
            lineHeight: 1.3,
            backdropFilter: 'blur(8px)',
          }}
        >
          <a href={asset.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            {asset.attribution ?? asset.creator ?? 'Artwork source'} ↗
          </a>
        </figcaption>
      ) : null}
    </figure>
  );
}

import { getEditorialAsset } from '@/lib/media/assets';

type Props = {
  assetId: string;
  height?: number | string;
  radius?: number;
  objectPosition?: string;
  showCredit?: boolean;
  className?: string;
};

export default function EditorialArtwork({
  assetId,
  height = 320,
  radius = 18,
  objectPosition = 'center',
  showCredit = true,
  className,
}: Props) {
  const asset = getEditorialAsset(assetId);
  if (!asset) return null;

  return (
    <figure className={className} style={{ margin: 0, position: 'relative' }}>
      <img
        src={asset.src}
        alt={asset.alt.en}
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height,
          objectFit: 'cover',
          objectPosition,
          borderRadius: radius,
          background: '#e9dfce',
        }}
      />
      {showCredit && asset.sourceUrl ? (
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

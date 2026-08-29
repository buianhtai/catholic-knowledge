import type { LocalizedText } from '@/lib/knowledge/types';

export type AssetRole = 'editorial' | 'portrait' | 'decorative' | 'factual-diagram';

export interface EditorialAsset {
  id: string;
  role: AssetRole;
  src: string;
  alt: LocalizedText;
  creator?: string;
  sourceUrl?: string;
  license?: string;
  attribution?: string;
  generated?: boolean;
  factual?: boolean;
}

export const assetRules = {
  factualDiagramsMustBeStructured: true,
  generatedRasterMayEncodeCanonicalFacts: false,
  requireAttributionWhenLicenseRequiresIt: true,
} as const;

export const editorialAssets: EditorialAsset[] = [
  {
    id: 'motif.catholic-knowledge-seal',
    role: 'decorative',
    src: 'inline:brand-mark',
    alt: { en: 'Catholic Knowledge cross and rays mark', vi: 'Biểu tượng thánh giá và tia sáng Catholic Knowledge' },
    creator: 'Catholic Knowledge',
    license: 'Project asset',
    generated: false,
    factual: false,
  },
  {
    id: 'diagram.knowledge-infographics',
    role: 'factual-diagram',
    src: 'component:Infographics',
    alt: { en: 'Structured knowledge infographic', vi: 'Đồ họa thông tin tri thức có cấu trúc' },
    creator: 'Catholic Knowledge',
    license: 'Project asset',
    generated: false,
    factual: true,
  },
];

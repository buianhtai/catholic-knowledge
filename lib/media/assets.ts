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
    id: 'art.augustine-philippe-de-champaigne',
    role: 'portrait',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saint%20Augustine%20by%20Philippe%20de%20Champaigne.jpg?width=1400',
    alt: { en: 'Classical painted portrait of Saint Augustine', vi: 'Chân dung hội họa cổ điển của Thánh Augustinô' },
    creator: 'Philippe de Champaigne',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Saint_Augustine_by_Philippe_de_Champaigne.jpg',
    license: 'Public domain',
    attribution: 'Philippe de Champaigne · Wikimedia Commons',
    generated: false,
    factual: false,
  },
  {
    id: 'art.nicaea-icon',
    role: 'editorial',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nicaea%20icon.jpg?width=1200',
    alt: { en: 'Historic icon depicting the First Council of Nicaea', vi: 'Biểu tượng lịch sử về Công đồng Nicaea I' },
    creator: 'Unknown iconographer',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nicaea_icon.jpg',
    license: 'Historical artwork; see Wikimedia Commons file page',
    attribution: 'Wikimedia Commons',
    generated: false,
    factual: false,
  },
  {
    id: 'art.gutenberg-bible',
    role: 'editorial',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gutenberg%20bible.jpg?width=1200',
    alt: { en: 'Illuminated page from the Gutenberg Bible', vi: 'Trang Kinh Thánh Gutenberg được trang trí' },
    creator: 'Johannes Gutenberg workshop',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gutenberg_bible.jpg',
    license: 'Public domain',
    attribution: 'Gutenberg Bible · Wikimedia Commons',
    generated: false,
    factual: false,
  },
  {
    id: 'art.rublev-trinity',
    role: 'editorial',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rublev%20Troitsa.jpg?width=1200',
    alt: { en: 'Andrei Rublev icon of the Holy Trinity', vi: 'Biểu tượng Chúa Ba Ngôi của Andrei Rublev' },
    creator: 'Andrei Rublev',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rublev_Troitsa.jpg',
    license: 'Public domain artwork',
    attribution: 'Andrei Rublev · Wikimedia Commons',
    generated: false,
    factual: false,
  },
  {
    id: 'art.mass-at-bolsena',
    role: 'editorial',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Raphael%20-%20The%20Mass%20at%20Bolsena.jpg?width=1400',
    alt: { en: 'Raphael fresco of the Mass at Bolsena', vi: 'Bích họa Thánh lễ tại Bolsena của Raphael' },
    creator: 'Raphael',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Raphael_-_The_Mass_at_Bolsena.jpg',
    license: 'Public domain',
    attribution: 'Raphael · Wikimedia Commons',
    generated: false,
    factual: false,
  },
  {
    id: 'place.rome-st-peters',
    role: 'editorial',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/St.%20Peter%27s%20Basilica.jpg?width=1400',
    alt: { en: "St. Peter's Basilica in Vatican City", vi: 'Vương cung thánh đường Thánh Phêrô tại Vatican' },
    creator: 'Kai Pilger',
    sourceUrl: "https://commons.wikimedia.org/wiki/File:St._Peter%27s_Basilica.jpg",
    license: 'Creative Commons Attribution-ShareAlike',
    attribution: 'Kai Pilger · Wikimedia Commons',
    generated: false,
    factual: false,
  },
  {
    id: 'place.jerusalem-holy-sepulchre',
    role: 'editorial',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Church%20of%20the%20Holy%20Sepulchre%20in%20Jerusalem.jpg?width=1400',
    alt: { en: 'Church of the Holy Sepulchre in Jerusalem', vi: 'Nhà thờ Mộ Thánh tại Jerusalem' },
    creator: 'David Shankbone',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_the_Holy_Sepulchre_in_Jerusalem.jpg',
    license: 'Creative Commons; see source page',
    attribution: 'David Shankbone · Wikimedia Commons',
    generated: false,
    factual: false,
  },
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

export function getEditorialAsset(id: string) {
  return editorialAssets.find((asset) => asset.id === id);
}

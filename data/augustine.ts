import type { KnowledgeEntity, KnowledgeRelationship, Source } from '@/lib/knowledge/types';

export const sources: Source[] = [
  {
    id: 'source.wikidata.augustine',
    title: 'Augustine of Hippo — Wikidata',
    publisher: 'Wikidata',
    url: 'https://www.wikidata.org/wiki/Q8018',
    sourceType: 'dataset',
    license: 'CC0',
    language: 'en',
  },
  {
    id: 'source.britannica.augustine',
    title: 'St. Augustine',
    publisher: 'Encyclopaedia Britannica',
    url: 'https://www.britannica.com/biography/Saint-Augustine',
    sourceType: 'secondary',
    language: 'en',
  },
];

const verified = [{ sourceId: 'source.wikidata.augustine', status: 'reviewed' as const }];

export const entities: KnowledgeEntity[] = [
  {
    id: 'person.augustine-of-hippo',
    type: 'person',
    subtype: 'Saint/Theologian/Bishop',
    slug: 'augustine-of-hippo',
    labels: { en: 'St. Augustine of Hippo', vi: 'Thánh Augustinô thành Hippo' },
    summary: {
      en: 'Bishop, theologian and author whose writings became foundational to Western Christianity.',
      vi: 'Giám mục, nhà thần học và tác giả có các tác phẩm ảnh hưởng sâu rộng đến Kitô giáo Tây phương.',
    },
    dates: { start: '0354-11-13', end: '0430-08-28', display: { en: '354–430', vi: '354–430' } },
    sourceRefs: verified,
  },
  {
    id: 'person.monica',
    type: 'person',
    subtype: 'Saint',
    slug: 'monica',
    labels: { en: 'St. Monica', vi: 'Thánh Monica' },
    summary: { en: 'Mother of Augustine, remembered for her perseverance in prayer.', vi: 'Mẹ của Augustinô, được nhớ đến vì sự kiên trì cầu nguyện.' },
    sourceRefs: verified,
  },
  {
    id: 'person.ambrose-of-milan',
    type: 'person',
    subtype: 'Saint/Bishop',
    slug: 'ambrose-of-milan',
    labels: { en: 'St. Ambrose of Milan', vi: 'Thánh Ambrôsiô thành Milan' },
    sourceRefs: verified,
  },
  {
    id: 'place.tagaste',
    type: 'place',
    subtype: 'City',
    slug: 'tagaste',
    labels: { en: 'Tagaste', vi: 'Tagaste' },
    sourceRefs: verified,
  },
  {
    id: 'place.hippo-regius',
    type: 'place',
    subtype: 'City/See',
    slug: 'hippo-regius',
    labels: { en: 'Hippo Regius', vi: 'Hippo Regius' },
    sourceRefs: verified,
  },
  {
    id: 'work.confessions',
    type: 'work',
    subtype: 'Book',
    slug: 'confessions',
    labels: { en: 'Confessions', vi: 'Tự Thuật' },
    sourceRefs: verified,
  },
  {
    id: 'work.city-of-god',
    type: 'work',
    subtype: 'Book',
    slug: 'city-of-god',
    labels: { en: 'The City of God', vi: 'Thành Đô Thiên Chúa' },
    sourceRefs: verified,
  },
  {
    id: 'concept.grace',
    type: 'concept',
    subtype: 'TheologyConcept',
    slug: 'grace',
    labels: { en: 'Grace', vi: 'Ân sủng' },
    sourceRefs: verified,
  },
];

export const relationships: KnowledgeRelationship[] = [
  { id: 'rel.monica-augustine', type: 'MOTHER_OF', from: 'person.monica', to: 'person.augustine-of-hippo', sourceRefs: verified },
  { id: 'rel.augustine-baptized-ambrose', type: 'BAPTIZED_BY', from: 'person.augustine-of-hippo', to: 'person.ambrose-of-milan', sourceRefs: verified },
  { id: 'rel.augustine-tagaste', type: 'BORN_IN', from: 'person.augustine-of-hippo', to: 'place.tagaste', sourceRefs: verified },
  { id: 'rel.augustine-hippo', type: 'BISHOP_OF', from: 'person.augustine-of-hippo', to: 'place.hippo-regius', sourceRefs: verified },
  { id: 'rel.augustine-confessions', type: 'WROTE', from: 'person.augustine-of-hippo', to: 'work.confessions', sourceRefs: verified },
  { id: 'rel.augustine-city-of-god', type: 'WROTE', from: 'person.augustine-of-hippo', to: 'work.city-of-god', sourceRefs: verified },
  { id: 'rel.augustine-grace', type: 'RELATED_TO', from: 'person.augustine-of-hippo', to: 'concept.grace', sourceRefs: verified },
];

export const getEntity = (id: string) => entities.find((entity) => entity.id === id);
export const getRelations = (id: string) => relationships.filter((edge) => edge.from === id || edge.to === id);

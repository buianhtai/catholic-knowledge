export type Locale = 'en' | 'vi';

export interface LocalizedText {
  en: string;
  vi?: string;
}

export type EntityType = 'person' | 'place' | 'work' | 'event' | 'concept' | 'organization';

export type RelationshipType =
  | 'WROTE'
  | 'AUTHORED_BY'
  | 'MENTIONED_IN'
  | 'DEFINED_AT'
  | 'PROMULGATED_BY'
  | 'INFLUENCED'
  | 'TEACHER_OF'
  | 'STUDENT_OF'
  | 'BAPTIZED_BY'
  | 'MOTHER_OF'
  | 'FATHER_OF'
  | 'CONTEMPORARY_OF'
  | 'PARTICIPATED_IN'
  | 'PRESENT_AT'
  | 'CONDEMNED_BY'
  | 'CANONIZED_BY'
  | 'BORN_IN'
  | 'DIED_IN'
  | 'LIVED_IN'
  | 'BISHOP_OF'
  | 'LOCATED_IN'
  | 'PILGRIMAGE_SITE_FOR'
  | 'FOUNDED'
  | 'MEMBER_OF'
  | 'LED'
  | 'RELATED_TO'
  | 'DEVELOPS'
  | 'SUPPORTS'
  | 'OPPOSES'
  | 'CLARIFIED_AT';

export type VerificationStatus = 'verified' | 'reviewed' | 'unreviewed';
export type FactClassification = 'historical-fact' | 'doctrine' | 'tradition' | 'interpretation' | 'disputed';

export interface Source {
  id: string;
  title: string;
  publisher?: string;
  url?: string;
  sourceType: 'primary' | 'secondary' | 'dataset' | 'api' | 'media';
  license?: string;
  attribution?: string;
  retrievedAt?: string;
  language?: Locale;
}

export interface SourceReference {
  sourceId: string;
  locator?: string;
  retrievedAt?: string;
  confidence?: number;
  status?: VerificationStatus;
}

export interface DateRange {
  start?: string;
  end?: string;
  display?: LocalizedText;
}

export interface KnowledgeEntity {
  id: string;
  type: EntityType;
  subtype?: string;
  slug: string;
  labels: LocalizedText;
  summary?: LocalizedText;
  dates?: DateRange;
  attributes?: Record<string, unknown>;
  sourceRefs: SourceReference[];
}

export interface KnowledgeRelationship {
  id: string;
  type: RelationshipType;
  from: string;
  to: string;
  labels?: LocalizedText;
  startDate?: string;
  endDate?: string;
  sourceRefs: SourceReference[];
  attributes?: Record<string, unknown>;
}

export interface KnowledgeFact {
  id: string;
  entityId: string;
  predicate: string;
  value: unknown;
  sourceRefs: SourceReference[];
  classification?: FactClassification;
}

export interface TimelineEvent {
  id: string;
  title: LocalizedText;
  date: string | DateRange;
  entityIds: string[];
  placeIds?: string[];
  sourceRefs: SourceReference[];
  summary?: LocalizedText;
}

export interface StoryStep {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  focusEntityIds: string[];
  focusRelationshipIds?: string[];
  timelineEventId?: string;
  sourceRefs?: SourceReference[];
}

export interface KnowledgeView {
  id: string;
  title: LocalizedText;
  nodeIds: string[];
  edgeIds: string[];
  lenses?: EntityType[];
  storySteps?: StoryStep[];
}

export interface MediaAsset {
  id: string;
  kind: 'image' | 'illustration' | 'icon' | 'audio';
  src: string;
  alt: LocalizedText;
  creator?: string;
  license?: string;
  attribution?: string;
  generated?: boolean;
}

export const text = (value: LocalizedText, locale: Locale = 'en') => value[locale] ?? value.en;

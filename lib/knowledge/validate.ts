import type { KnowledgeEntity, KnowledgeRelationship, Source, SourceReference } from './types';

export type KnowledgeValidationIssue = {
  code: string;
  message: string;
  subjectId?: string;
};

function validateRefs(subjectId: string, refs: SourceReference[], sourceIds: Set<string>): KnowledgeValidationIssue[] {
  const issues: KnowledgeValidationIssue[] = [];
  if (refs.length === 0) issues.push({ code: 'missing-source-ref', subjectId, message: `${subjectId} has no source references.` });
  for (const ref of refs) {
    if (!sourceIds.has(ref.sourceId)) issues.push({ code: 'unknown-source-ref', subjectId, message: `${subjectId} references unknown source ${ref.sourceId}.` });
    if (ref.confidence !== undefined && (ref.confidence < 0 || ref.confidence > 1)) issues.push({ code: 'invalid-confidence', subjectId, message: `${subjectId} has confidence outside 0..1.` });
  }
  return issues;
}

export function validateKnowledgeDataset(input: {
  entities: KnowledgeEntity[];
  relationships: KnowledgeRelationship[];
  sources: Source[];
}): KnowledgeValidationIssue[] {
  const { entities, relationships, sources } = input;
  const issues: KnowledgeValidationIssue[] = [];
  const entityIds = new Set<string>();
  const sourceIds = new Set<string>();
  const relationIds = new Set<string>();

  for (const source of sources) {
    if (sourceIds.has(source.id)) issues.push({ code: 'duplicate-source-id', subjectId: source.id, message: `Duplicate source id ${source.id}.` });
    sourceIds.add(source.id);
    if (!source.title.trim()) issues.push({ code: 'missing-source-title', subjectId: source.id, message: `${source.id} has no title.` });
  }

  for (const entity of entities) {
    if (entityIds.has(entity.id)) issues.push({ code: 'duplicate-entity-id', subjectId: entity.id, message: `Duplicate entity id ${entity.id}.` });
    entityIds.add(entity.id);
    if (!entity.labels.en?.trim()) issues.push({ code: 'missing-en-label', subjectId: entity.id, message: `${entity.id} has no English label.` });
    if (!entity.labels.vi?.trim()) issues.push({ code: 'missing-vi-label', subjectId: entity.id, message: `${entity.id} has no Vietnamese label.` });
    if (!entity.slug.trim()) issues.push({ code: 'missing-slug', subjectId: entity.id, message: `${entity.id} has no slug.` });
    issues.push(...validateRefs(entity.id, entity.sourceRefs, sourceIds));
  }

  for (const relation of relationships) {
    if (relationIds.has(relation.id)) issues.push({ code: 'duplicate-relationship-id', subjectId: relation.id, message: `Duplicate relationship id ${relation.id}.` });
    relationIds.add(relation.id);
    if (!entityIds.has(relation.from)) issues.push({ code: 'unknown-from-entity', subjectId: relation.id, message: `${relation.id} starts at unknown entity ${relation.from}.` });
    if (!entityIds.has(relation.to)) issues.push({ code: 'unknown-to-entity', subjectId: relation.id, message: `${relation.id} ends at unknown entity ${relation.to}.` });
    issues.push(...validateRefs(relation.id, relation.sourceRefs, sourceIds));
  }

  return issues;
}

import type { KnowledgeEntity, KnowledgeRelationship } from '@/lib/knowledge/types';

export function buildExplorationIndex(entities: KnowledgeEntity[], relationships: KnowledgeRelationship[]) {
  const entityById = new Map(entities.map((entity) => [entity.id, entity]));
  const relationsByEntityId = new Map<string, KnowledgeRelationship[]>();
  const neighborIdsByEntityId = new Map<string, Set<string>>();

  for (const entity of entities) {
    relationsByEntityId.set(entity.id, []);
    neighborIdsByEntityId.set(entity.id, new Set([entity.id]));
  }

  for (const relationship of relationships) {
    relationsByEntityId.get(relationship.from)?.push(relationship);
    relationsByEntityId.get(relationship.to)?.push(relationship);
    neighborIdsByEntityId.get(relationship.from)?.add(relationship.to);
    neighborIdsByEntityId.get(relationship.to)?.add(relationship.from);
  }

  return { entityById, relationsByEntityId, neighborIdsByEntityId };
}

export function findRelationshipPath(
  startId: string,
  targetId: string,
  relationships: KnowledgeRelationship[],
): string[] {
  if (startId === targetId) return [startId];
  const adjacency = new Map<string, string[]>();
  for (const relationship of relationships) {
    adjacency.set(relationship.from, [...(adjacency.get(relationship.from) ?? []), relationship.to]);
    adjacency.set(relationship.to, [...(adjacency.get(relationship.to) ?? []), relationship.from]);
  }

  const queue: string[][] = [[startId]];
  const visited = new Set([startId]);
  while (queue.length) {
    const path = queue.shift()!;
    const current = path[path.length - 1];
    for (const neighbor of adjacency.get(current) ?? []) {
      if (visited.has(neighbor)) continue;
      const next = [...path, neighbor];
      if (neighbor === targetId) return next;
      visited.add(neighbor);
      queue.push(next);
    }
  }
  return [];
}

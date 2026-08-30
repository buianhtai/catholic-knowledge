'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { entities, relationships } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';
import { buildExplorationIndex, findRelationshipPath } from '@/lib/knowledge/exploration';
import { toJourneyHref, type ExplorationContext } from '@/lib/knowledge/exploration-context';
import { getEditorialAsset } from '@/lib/media/assets';
import KnowledgeEntityNode, { type KnowledgeNodeData } from './KnowledgeEntityNode';
import AugustineContextSync from './AugustineContextSync';
import styles from './KnowledgeGraph.module.css';

type Lens = 'all' | 'person' | 'place' | 'work' | 'concept';

const positions: Record<string, { x: number; y: number }> = {
  'person.augustine-of-hippo': { x: 420, y: 255 },
  'person.monica': { x: 65, y: 80 },
  'person.ambrose-of-milan': { x: 760, y: 80 },
  'place.tagaste': { x: 70, y: 445 },
  'place.hippo-regius': { x: 760, y: 455 },
  'work.confessions': { x: 230, y: 580 },
  'work.city-of-god': { x: 530, y: 600 },
  'concept.grace': { x: 850, y: 270 },
};

const assets: Record<string, string> = {
  'person.augustine-of-hippo': 'art.augustine-philippe-de-champaigne',
  'person.monica': 'person.monica-piero',
  'person.ambrose-of-milan': 'person.ambrose',
  'place.hippo-regius': 'place.hippo-regius',
  'work.confessions': 'work.confessions-manuscript',
};

const nodeTypes = { knowledge: KnowledgeEntityNode };
const index = buildExplorationIndex(entities, relationships);

function Canvas() {
  const [lens, setLens] = useState<Lens>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('person.augustine-of-hippo');
  const [pathOrigin, setPathOrigin] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>(['person.augustine-of-hippo']);
  const [journeyContext, setJourneyContext] = useState<ExplorationContext | null>(null);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const { fitView } = useReactFlow();

  const selectedRelations = index.relationsByEntityId.get(selectedId) ?? [];
  const neighbors = index.neighborIdsByEntityId.get(selectedId) ?? new Set([selectedId]);
  const activePath = useMemo(
    () => (pathOrigin ? findRelationshipPath(pathOrigin, selectedId, relationships) : []),
    [pathOrigin, selectedId],
  );
  const pathSet = useMemo(() => new Set(activePath), [activePath]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const focus = useCallback(
    (id: string) => {
      if (!index.entityById.has(id)) return;
      setSelectedId(id);
      setInspectorOpen(true);
      setHistory((prev) => (prev.at(-1) === id ? prev : [...prev, id].slice(-7)));
      requestAnimationFrame(() =>
        fitView({ nodes: [{ id }], duration: reducedMotion ? 0 : 420, maxZoom: 1.15, padding: 0.7 }),
      );
    },
    [fitView, reducedMotion],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const context: ExplorationContext = {
      focusEntityId: params.get('focus') ?? undefined,
      journeyId: params.get('journey') ?? undefined,
      chapterId: params.get('chapter') ?? undefined,
      chapterLabel: params.get('chapterLabel') ?? undefined,
    };
    if (context.journeyId) setJourneyContext(context);
    if (context.focusEntityId && index.entityById.has(context.focusEntityId)) focus(context.focusEntityId);
  }, [focus]);

  const nodes = useMemo<Node<KnowledgeNodeData>[]>(
    () =>
      entities.map((entity) => {
        const visible = lens === 'all' || entity.type === lens;
        const matches = !query || text(entity.labels).toLowerCase().includes(query.toLowerCase());
        const related = neighbors.has(entity.id) || pathSet.has(entity.id);
        const selected = entity.id === selectedId;
        return {
          id: entity.id,
          type: 'knowledge',
          position: positions[entity.id] ?? { x: 0, y: 0 },
          data: {
            label: text(entity.labels),
            type: entity.type,
            subtitle: entity.subtype,
            assetId: selected ? assets[entity.id] : undefined,
            selected,
            muted: !(visible && matches && related),
            relationCount: (index.relationsByEntityId.get(entity.id) ?? []).length,
            sourceCount: entity.sourceRefs.length,
            pathActive: pathSet.has(entity.id),
            onActivate: () => focus(entity.id),
          },
        };
      }),
    [lens, query, selectedId, neighbors, pathSet, focus],
  );

  const edges = useMemo<Edge[]>(
    () =>
      relationships.map((rel) => {
        const pathEdge = activePath.some(
          (id, i) =>
            i < activePath.length - 1 &&
            ((rel.from === id && rel.to === activePath[i + 1]) ||
              (rel.to === id && rel.from === activePath[i + 1])),
        );
        const active = pathEdge || rel.from === selectedId || rel.to === selectedId;
        return {
          id: rel.id,
          source: rel.from,
          target: rel.to,
          label: rel.type.replaceAll('_', ' ').toLowerCase(),
          animated: active && !reducedMotion,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: {
            stroke: pathEdge ? '#8b5d18' : active ? '#c99742' : '#9da7ae',
            strokeWidth: pathEdge ? 3.5 : active ? 2.6 : 1.2,
            opacity: active || (neighbors.has(rel.from) && neighbors.has(rel.to)) ? 1 : 0.15,
          },
          labelStyle: {
            fontSize: 10,
            fill: active ? '#8a5b17' : '#6f756f',
            fontWeight: active ? 700 : 400,
          },
          labelBgStyle: { fill: '#fbf7ee', fillOpacity: 0.9 },
        };
      }),
    [selectedId, neighbors, activePath, reducedMotion],
  );

  const selected = index.entityById.get(selectedId) ?? entities[0];
  const selectedAssetId = assets[selected.id];
  const selectedAsset = selectedAssetId ? getEditorialAsset(selectedAssetId) : undefined;
  const handleNodeClick: NodeMouseHandler = (_, node) => focus(node.id);

  return (
    <div className={styles.shell}>
      {journeyContext && (
        <div className={styles.journeyBridge}>
          <div>
            <span>Bạn vừa đến từ một câu chuyện</span>
            <b>{journeyContext.chapterLabel ?? 'Từ Chúa Giêsu đến Nixêa'}</b>
            <small>Bạn có thể khám phá tự do ở đây rồi quay lại đúng chặng đang đọc.</small>
          </div>
          <Link href={toJourneyHref(journeyContext)}>← Quay lại câu chuyện</Link>
        </div>
      )}

      <header className={styles.universeHeader}>
        <div>
          <div className="eyebrow">Khám phá</div>
          <h1>Chạm vào một người. Xem điều gì kết nối với họ.</h1>
          <p>Bắt đầu thật đơn giản: chọn một thẻ trên bản đồ. Chúng tôi sẽ làm nổi bật những người, nơi chốn và tác phẩm liên quan.</p>
        </div>
        <div className={styles.history} aria-label="Những mục vừa xem">
          {history.map((id, i) => {
            const entity = index.entityById.get(id);
            return entity ? (
              <button onClick={() => focus(id)} key={`${id}-${i}`}>
                {i > 0 && '‹ '}{text(entity.labels)}
              </button>
            ) : null;
          })}
        </div>
      </header>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm Augustinô, Monica, Tự Thuật…"
          aria-label="Tìm người, nơi chốn hoặc tác phẩm"
        />
        <button onClick={() => fitView({ duration: reducedMotion ? 0 : 350, padding: 0.2 })}>Xem tất cả</button>
        <button onClick={() => setAdvancedOpen((value) => !value)} aria-expanded={advancedOpen}>
          {advancedOpen ? 'Ẩn công cụ' : 'Khám phá sâu hơn'}
        </button>
        {advancedOpen && (
          <>
            {([['all', 'Tất cả'], ['person', 'Người'], ['place', 'Nơi chốn'], ['work', 'Tác phẩm'], ['concept', 'Ý tưởng']] as [Lens, string][]).map(([value, label]) => (
              <button key={value} onClick={() => setLens(value)} className={lens === value ? styles.activeTool : ''}>
                {label}
              </button>
            ))}
            <button onClick={() => setPathOrigin(pathOrigin ? null : selectedId)} className={pathOrigin ? styles.activeTool : ''}>
              {pathOrigin ? 'Dừng so sánh' : 'Hai mục này liên quan thế nào?'}
            </button>
          </>
        )}
      </div>

      {pathOrigin && (
        <div className={styles.pathReceipt}>
          <span>Bắt đầu từ <b>{text(index.entityById.get(pathOrigin)?.labels ?? { en: pathOrigin, vi: pathOrigin })}</b></span>
          {activePath.length > 1 && <span>{activePath.map((id) => text(index.entityById.get(id)!.labels)).join(' → ')}</span>}
        </div>
      )}

      <section className={styles.interactiveWorkspace}>
        <div className={styles.interactiveCanvas}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            fitView
            minZoom={0.35}
            maxZoom={1.6}
            proOptions={{ hideAttribution: true }}
            panOnScroll
            zoomOnPinch
            zoomOnDoubleClick={false}
            selectionOnDrag={false}
            nodesDraggable={false}
          >
            <Background gap={32} size={1}/>
            <Controls showInteractive={false}/>
            <MiniMap pannable zoomable maskColor="rgba(6,24,45,.12)"/>
          </ReactFlow>
          <div className={styles.canvasHint}>Chạm một thẻ để xem câu chuyện và những điều liên quan</div>
        </div>

        <div className={styles.mobileInspectorBar}>
          <button onClick={() => setInspectorOpen((open) => !open)} aria-expanded={inspectorOpen} aria-controls="entity-inspector">
            {inspectorOpen ? 'Ẩn phần giải thích' : 'Xem phần giải thích'} · {text(selected.labels)}
          </button>
        </div>

        <aside id="entity-inspector" className={`${styles.entityInspector} ${!inspectorOpen ? styles.entityInspectorClosed : ''}`}>
          {selectedAsset && (
            <Image
              className={styles.inspectorImage}
              src={selectedAsset.src}
              alt={selectedAsset.alt.vi ?? selectedAsset.alt.en}
              width={330}
              height={235}
              sizes="(max-width: 1050px) 100vw, 330px"
              style={{ objectFit: 'cover', objectPosition: selectedAsset.focalPoint ?? 'center' }}
            />
          )}
          <div className="eyebrow">Đang xem</div>
          <h2>{text(selected.labels)}</h2>
          {selected.dates?.display && <div className={styles.entityDates}>{text(selected.dates.display)}</div>}
          <p>{selected.summary ? text(selected.summary) : 'Khám phá mục này qua những người, nơi chốn, tác phẩm và ý tưởng liên quan.'}</p>
          <div className={styles.inspectorStats}>
            <span>{selectedRelations.length} điều liên quan</span>
            <span>{selected.sourceRefs.length} nguồn</span>
          </div>
          <div className={styles.relationActions}>
            <strong>Bạn có thể xem tiếp</strong>
            {selectedRelations.map((rel) => {
              const otherId = rel.from === selectedId ? rel.to : rel.from;
              const other = index.entityById.get(otherId);
              return other ? (
                <button key={rel.id} onClick={() => focus(otherId)}>
                  <span>{rel.type.replaceAll('_', ' ')}</span>
                  <b>{text(other.labels)} →</b>
                </button>
              ) : null;
            })}
          </div>
          {selectedAsset && (
            <div className={styles.assetEvidence}>
              <span>Nguồn của hình ảnh</span>
              <a href={selectedAsset.sourceUrl} target="_blank" rel="noreferrer">{selectedAsset.creator} · {selectedAsset.license}</a>
            </div>
          )}
          <div className={styles.inspectorFoot}>
            <strong>Cứ chọn điều làm bạn tò mò.</strong>
            <p>Bạn không cần đi theo thứ tự. Mỗi lựa chọn sẽ mở ra một phần khác của câu chuyện.</p>
          </div>
        </aside>
      </section>
      <AugustineContextSync selectedId={selectedId} onFocus={focus}/>
    </div>
  );
}

export default function KnowledgeGraphExplorer() {
  return <ReactFlowProvider><Canvas/></ReactFlowProvider>;
}

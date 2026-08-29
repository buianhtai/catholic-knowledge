'use client';

import { useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { entities, relationships } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';
import styles from './KnowledgeGraph.module.css';

type Lens = 'all' | 'person' | 'place' | 'work' | 'concept';

const positions: Record<string, { x: number; y: number }> = {
  'person.augustine-of-hippo': { x: 420, y: 255 },
  'person.monica': { x: 80, y: 90 },
  'person.ambrose-of-milan': { x: 700, y: 80 },
  'place.tagaste': { x: 90, y: 420 },
  'place.hippo-regius': { x: 720, y: 430 },
  'work.confessions': { x: 240, y: 535 },
  'work.city-of-god': { x: 535, y: 545 },
  'concept.grace': { x: 815, y: 250 },
};

const icons: Record<string, string> = { person: '✦', place: '⌖', work: '▤', concept: '◈', event: '◎', organization: '⌂' };

export default function KnowledgeGraphExplorer() {
  const [lens, setLens] = useState<Lens>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('person.augustine-of-hippo');
  const [storyStep, setStoryStep] = useState(0);

  const story = ['person.monica', 'place.tagaste', 'person.augustine-of-hippo', 'person.ambrose-of-milan', 'work.confessions', 'place.hippo-regius'];

  const nodes = useMemo<Node[]>(() => entities.map((entity) => {
    const visible = lens === 'all' || entity.type === lens;
    const matches = !query || text(entity.labels).toLowerCase().includes(query.toLowerCase());
    const selected = entity.id === selectedId;
    return {
      id: entity.id,
      position: positions[entity.id] ?? { x: 0, y: 0 },
      data: { label: `${icons[entity.type]} ${text(entity.labels)}` },
      style: {
        opacity: visible && matches ? 1 : 0.18,
        borderRadius: 18,
        border: selected ? '2px solid #b48a3c' : '1px solid #ded4c4',
        background: entity.id === 'person.augustine-of-hippo' ? '#14213a' : '#fffdf8',
        color: entity.id === 'person.augustine-of-hippo' ? '#fff' : '#14213a',
        padding: 14,
        width: entity.id === 'person.augustine-of-hippo' ? 190 : 165,
        fontWeight: 700,
        boxShadow: selected ? '0 14px 34px rgba(20,33,58,.16)' : 'none',
      },
    };
  }), [lens, query, selectedId]);

  const edges = useMemo<Edge[]>(() => relationships.map((rel) => ({
    id: rel.id,
    source: rel.from,
    target: rel.to,
    label: rel.type.replaceAll('_', ' ').toLowerCase(),
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 1.5 },
    labelStyle: { fontSize: 10, fill: '#6f756f' },
  })), []);

  const selected = entities.find((entity) => entity.id === selectedId) ?? entities[0];
  const selectedRelations = relationships.filter((edge) => edge.from === selectedId || edge.to === selectedId);

  const advanceStory = () => {
    const next = (storyStep + 1) % story.length;
    setStoryStep(next);
    setSelectedId(story[next]);
  };

  const handleNodeClick: NodeMouseHandler = (_, node) => setSelectedId(node.id);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <div><div className="eyebrow">Interactive knowledge graph</div><h1>Explore Augustine’s world.</h1></div>
        <p>Filter by semantic lens, inspect relationships, search the focused graph, or play a guided story through Augustine’s life.</p>
      </header>
      <div className={styles.toolbar}>
        <input className={styles.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find Monica, Confessions, Grace…" aria-label="Search graph" />
        <button className={styles.storyButton} onClick={advanceStory}>Story mode · next →</button>
      </div>
      <section className={styles.workspace}>
        <aside className={`${styles.panel} ${styles.sidebar}`}>
          <h3>Knowledge lens</h3>
          {([['all','All'],['person','People'],['place','Places'],['work','Writings'],['concept','Ideas']] as [Lens,string][]).map(([value,label]) => (
            <button key={value} onClick={() => setLens(value)} className={`${styles.lens} ${lens === value ? styles.lensActive : ''}`}><span>{value === 'all' ? '◎' : icons[value]}</span>{label}</button>
          ))}
          <div className={styles.legend}>
            <div className={styles.legendItem}><span className={styles.swatch}/>Selected nodes expose provenance-aware details.</div>
            <div className={styles.legendItem}><span className={styles.swatch}/>Edges are canonical typed relationships.</div>
          </div>
        </aside>

        <div className={`${styles.panel} ${styles.canvas}`}>
          <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.45} maxZoom={1.5} onNodeClick={handleNodeClick} proOptions={{ hideAttribution: true }}>
            <Background gap={28} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        <aside className={`${styles.panel} ${styles.detail}`}>
          <div className={styles.detailIcon}>{icons[selected.type]}</div>
          <div className="eyebrow">{selected.type} · {selected.subtype}</div>
          <h2>{text(selected.labels)}</h2>
          <p>{selected.summary ? text(selected.summary) : 'Explore this node through its typed relationships and supporting sources.'}</p>
          <div className={styles.meta}><span className={styles.chip}>{selectedRelations.length} relationships</span><span className={styles.chip}>{selected.sourceRefs.length} source refs</span></div>
          <div className={styles.story}><strong>Why this matters</strong><p>The graph is a navigation and explanation surface: every relationship can lead into another entity page, timeline event, source, or guided story step.</p></div>
        </aside>
      </section>
    </div>
  );
}

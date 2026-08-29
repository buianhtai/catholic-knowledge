'use client';

import { useCallback, useMemo, useState } from 'react';
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

const assets: Record<string,string> = {
  'person.augustine-of-hippo':'art.augustine-philippe-de-champaigne',
  'person.monica':'person.monica-piero',
  'person.ambrose-of-milan':'person.ambrose',
  'work.confessions':'art.gutenberg-bible',
  'work.city-of-god':'art.gutenberg-bible',
};

const nodeTypes = { knowledge: KnowledgeEntityNode };

function Canvas(){
  const [lens,setLens]=useState<Lens>('all');
  const [query,setQuery]=useState('');
  const [selectedId,setSelectedId]=useState('person.augustine-of-hippo');
  const [history,setHistory]=useState<string[]>(['person.augustine-of-hippo']);
  const { fitView } = useReactFlow();

  const selectedRelations = useMemo(()=>relationships.filter(r=>r.from===selectedId||r.to===selectedId),[selectedId]);
  const neighbors = useMemo(()=>new Set(selectedRelations.flatMap(r=>[r.from,r.to])),[selectedRelations]);

  const focus = useCallback((id:string)=>{
    setSelectedId(id);
    setHistory(prev=>prev.at(-1)===id?prev:[...prev,id].slice(-6));
    requestAnimationFrame(()=>fitView({nodes:[{id}],duration:500,maxZoom:1.15,padding:.7}));
  },[fitView]);

  const nodes = useMemo<Node<KnowledgeNodeData>[]>(()=>entities.map(entity=>{
    const visibleByLens=lens==='all'||entity.type===lens;
    const matches=!query||text(entity.labels).toLowerCase().includes(query.toLowerCase());
    const related=neighbors.has(entity.id)||entity.id===selectedId;
    const degree=relationships.filter(r=>r.from===entity.id||r.to===entity.id).length;
    return {
      id:entity.id,
      type:'knowledge',
      position:positions[entity.id]??{x:0,y:0},
      data:{label:text(entity.labels),type:entity.type,subtitle:entity.subtype,assetId:assets[entity.id],selected:entity.id===selectedId,muted:!(visibleByLens&&matches&&related),relationCount:degree},
    };
  }),[lens,query,selectedId,neighbors]);

  const edges = useMemo<Edge[]>(()=>relationships.map(rel=>{
    const active=rel.from===selectedId||rel.to===selectedId;
    return {id:rel.id,source:rel.from,target:rel.to,label:rel.type.replaceAll('_',' ').toLowerCase(),animated:active,markerEnd:{type:MarkerType.ArrowClosed},style:{stroke:active?'#c99742':'#9da7ae',strokeWidth:active?2.6:1.2,opacity:neighbors.has(rel.from)&&neighbors.has(rel.to)?1:.18},labelStyle:{fontSize:10,fill:active?'#8a5b17':'#6f756f',fontWeight:active?700:400},labelBgStyle:{fill:'#fbf7ee',fillOpacity:.9}};
  }),[selectedId,neighbors]);

  const selected=entities.find(e=>e.id===selectedId)??entities[0];
  const selectedAsset=assets[selected.id]?getEditorialAsset(assets[selected.id]):undefined;
  const handleNodeClick:NodeMouseHandler=(_,node)=>focus(node.id);

  return <div className={styles.shell}>
    <header className={styles.universeHeader}><div><div className="eyebrow">Catholic Knowledge · Explore mode</div><h1>Đi vào thế giới của Augustinô.</h1><p>Chọn một nhân vật, địa danh, tác phẩm hoặc ý tưởng. Canvas, dòng thời gian và hành trình địa lý sẽ cùng tập trung vào thực thể đó.</p></div><div className={styles.history}>{history.map((id,i)=>{const e=entities.find(x=>x.id===id);return e?<button onClick={()=>focus(id)} key={`${id}-${i}`}>{i>0&&'‹ '}{text(e.labels)}</button>:null})}</div></header>

    <div className={styles.toolbar}><input className={styles.search} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tìm Monica, Ambrôsiô, Tự Thuật…" aria-label="Tìm trong bản đồ"/>{([['all','Tất cả'],['person','Nhân vật'],['place','Địa danh'],['work','Tác phẩm'],['concept','Ý tưởng']] as [Lens,string][]).map(([v,l])=><button key={v} onClick={()=>setLens(v)} className={lens===v?styles.activeTool:''}>{l}</button>)}<button onClick={()=>focus('person.augustine-of-hippo')}>Về Augustinô</button><button onClick={()=>fitView({duration:450,padding:.2})}>Toàn cảnh</button></div>

    <section className={styles.interactiveWorkspace}>
      <div className={styles.interactiveCanvas}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodeClick={handleNodeClick} fitView minZoom={.35} maxZoom={1.6} proOptions={{hideAttribution:true}} panOnScroll zoomOnPinch selectionOnDrag={false}>
          <Background gap={32} size={1}/><Controls showInteractive={false}/><MiniMap pannable zoomable maskColor="rgba(6,24,45,.12)"/>
        </ReactFlow>
        <div className={styles.canvasHint}>Kéo để di chuyển · cuộn/chụm để thu phóng · chọn node để tập trung</div>
      </div>

      <aside className={styles.entityInspector}>
        {selectedAsset&&<img className={styles.inspectorImage} src={selectedAsset.src} alt={selectedAsset.alt.vi??selectedAsset.alt.en}/>}<div className="eyebrow">{selected.type} · {selected.subtype}</div><h2>{text(selected.labels)}</h2><p>{selected.summary?text(selected.summary):'Khám phá thực thể này qua các mối quan hệ được mô hình hóa trong bản đồ tri thức.'}</p>
        <div className={styles.inspectorStats}><span>{selectedRelations.length} mối liên hệ</span><span>{selected.sourceRefs.length} nguồn</span></div>
        <div className={styles.relationActions}><strong>Đi tiếp từ đây</strong>{selectedRelations.map(rel=>{const otherId=rel.from===selectedId?rel.to:rel.from;const other=entities.find(e=>e.id===otherId);return other?<button key={rel.id} onClick={()=>focus(otherId)}><span>{rel.type.replaceAll('_',' ')}</span><b>{text(other.labels)} →</b></button>:null})}</div>
        <div className={styles.inspectorFoot}><strong>Một trạng thái, nhiều góc nhìn.</strong><p>Graph là trung tâm điều hướng; timeline và bản đồ bên dưới phản chiếu cùng thực thể đang được chọn.</p></div>
      </aside>
    </section>

    <AugustineContextSync selectedId={selectedId} onFocus={focus}/>
  </div>;
}

export default function KnowledgeGraphExplorer(){return <ReactFlowProvider><Canvas/></ReactFlowProvider>}

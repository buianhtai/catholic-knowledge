'use client';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { getEditorialAsset } from '@/lib/media/assets';
import styles from './KnowledgeGraph.module.css';

export type KnowledgeNodeData = {
  label: string;
  type: string;
  subtitle?: string;
  assetId?: string;
  selected?: boolean;
  muted?: boolean;
  relationCount?: number;
  sourceCount?: number;
  pathActive?: boolean;
};

export default function KnowledgeEntityNode({ data }: NodeProps) {
  const d = data as KnowledgeNodeData;
  const asset = d.assetId ? getEditorialAsset(d.assetId) : undefined;
  return <div className={`${styles.entityNode} ${d.selected?styles.entityNodeSelected:''} ${d.muted?styles.entityNodeMuted:''} ${d.pathActive?styles.entityNodePath:''}`} aria-label={`${d.label}, ${d.type}, ${d.relationCount ?? 0} mối liên hệ, ${d.sourceCount ?? 0} nguồn`}>
    <Handle type="target" position={Position.Left} className={styles.handle}/>
    <div className={styles.nodeMedia}>{asset ? <img src={asset.src} alt={asset.alt.vi ?? asset.alt.en}/> : <span>{d.type==='place'?'⌖':d.type==='work'?'▤':d.type==='concept'?'◈':'✦'}</span>}</div>
    <div className={styles.nodeCopy}><small>{d.type}</small><strong>{d.label}</strong>{d.subtitle&&<span>{d.subtitle}</span>}<em className={styles.sourceBadge}>SRC {d.sourceCount ?? 0}</em></div>
    {typeof d.relationCount==='number'&&<b className={styles.nodeCount}>{d.relationCount}</b>}
    <Handle type="source" position={Position.Right} className={styles.handle}/>
  </div>;
}

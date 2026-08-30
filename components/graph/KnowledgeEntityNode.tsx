'use client';
import Image from 'next/image';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { getEditorialAsset } from '@/lib/media/assets';
import styles from './KnowledgeGraph.module.css';
import responsive from './KnowledgeGraphResponsive.module.css';

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
  onActivate?: () => void;
};

export default function KnowledgeEntityNode({ data }: NodeProps) {
  const d = data as KnowledgeNodeData;
  const asset = d.assetId ? getEditorialAsset(d.assetId) : undefined;
  const activate = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    d.onActivate?.();
  };
  return <div
    className={`${styles.entityNode} ${responsive.entityNode} ${d.selected?styles.entityNodeSelected:''} ${d.muted?styles.entityNodeMuted:''} ${d.pathActive?styles.entityNodePath:''}`}
    role="button"
    tabIndex={0}
    aria-pressed={Boolean(d.selected)}
    aria-label={`${d.label}, ${d.type}, ${d.relationCount ?? 0} mối liên hệ, ${d.sourceCount ?? 0} nguồn`}
    onKeyDown={activate}
  >
    <Handle type="target" position={Position.Left} className={styles.handle}/>
    <div className={`${styles.nodeMedia} ${responsive.nodeMedia}`}>{asset ? <Image src={asset.src} alt={asset.alt.vi ?? asset.alt.en} width={72} height={76} sizes="72px" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:asset.focalPoint ?? 'center'}}/> : <span aria-hidden="true">{d.type==='place'?'⌖':d.type==='work'?'▤':d.type==='concept'?'◈':'●'}</span>}</div>
    <div className={styles.nodeCopy}><small>{d.type}</small><strong>{d.label}</strong>{d.subtitle&&<span>{d.subtitle}</span>}<em className={styles.sourceBadge}>SRC {d.sourceCount ?? 0}</em></div>
    {typeof d.relationCount==='number'&&<b className={styles.nodeCount}>{d.relationCount}</b>}
    <Handle type="source" position={Position.Right} className={styles.handle}/>
  </div>;
}

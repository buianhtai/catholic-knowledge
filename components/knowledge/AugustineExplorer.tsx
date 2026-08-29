'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { entities, relationships, sources } from '@/data/augustine';
import { MilestoneRibbon, RelationshipOrbit } from '@/components/visual/Infographics';
import { text } from '@/lib/knowledge/types';
import styles from './AugustineExplorer.module.css';

type Tab = 'Overview' | 'Timeline' | 'Connections' | 'Writings' | 'Sources';
const timeline = [['354','Born in Tagaste, Roman North Africa.'],['383','Leaves Carthage for Rome and later Milan.'],['387','Baptized in Milan by Ambrose.'],['391','Ordained priest at Hippo.'],['395','Becomes bishop of Hippo.'],['397','Begins composing Confessions.'],['430','Dies during the siege of Hippo.']];
const relationIcons: Record<string,string>={person:'✦',place:'⌖',work:'▤',concept:'◈',event:'◎',organization:'⌂'};

export default function AugustineExplorer(){
 const [tab,setTab]=useState<Tab>('Overview');
 const augustine=entities.find(e=>e.id==='person.augustine-of-hippo');
 const connected=useMemo(()=>relationships.map(edge=>{const otherId=edge.from===augustine?.id?edge.to:edge.from;return{edge,entity:entities.find(item=>item.id===otherId)}}).filter(i=>i.entity),[augustine?.id]);
 const writings=connected.filter(i=>i.entity?.type==='work');
 if(!augustine)return null;
 return <main className={styles.page}>
  <section className={`container ${styles.hero}`}>
   <div className={styles.portraitPanel}><div className={styles.arch}>♜</div><div className={styles.halo}/><div className={styles.portrait}>A</div><div className={styles.portraitMeta}><span>Saint · Bishop · Theologian</span><span>354–430</span></div></div>
   <div className={styles.identity}><div className="eyebrow">Saint · Doctor of the Church</div><h1>{text(augustine.labels)}</h1><p>{augustine.summary?text(augustine.summary):''}</p><div className={styles.roles}><span>Doctor of the Church</span><span>Bishop of Hippo</span><span>North Africa</span><span>Late Antiquity</span></div><div className={styles.metrics}><div><strong>76</strong><span>years of life</span></div><div><strong>{relationships.length}</strong><span>seed relations</span></div><div><strong>{writings.length}</strong><span>featured works</span></div><div><strong>28 Aug</strong><span>feast day</span></div></div><div className={styles.actions}><Link href="/explore">Explore knowledge map →</Link><Link href="/timeline">Place in Church history →</Link></div></div>
  </section>

  <nav className={`container ${styles.tabs}`}>{(['Overview','Timeline','Connections','Writings','Sources'] as Tab[]).map(name=><button key={name} className={tab===name?styles.active:''} onClick={()=>setTab(name)}>{name}</button>)}</nav>

  <section className={`container ${styles.body}`}>
   {tab==='Overview'&&<><article className={styles.storyPanel}><div className="eyebrow">Visual biography</div><h2>A restless heart becomes a map of conversion.</h2><p>Augustine’s life crosses family, philosophy, migration, friendship, episcopal leadership and writing. Each turning point can be explored as a connected entity rather than buried inside a long article.</p><MilestoneRibbon items={[{year:'354',title:'Tagaste',detail:'birth and family'},{year:'383',title:'Milan',detail:'intellectual turning point'},{year:'387',title:'Baptism',detail:'Ambrose and conversion'},{year:'395',title:'Hippo',detail:'bishop and pastor'},{year:'397+',title:'Writings',detail:'Confessions and theology'}]}/></article><aside className={styles.legacy}><div className="eyebrow">Influence map</div><h3>Why Augustine matters</h3><RelationshipOrbit center="Augustine" items={[{label:'Monica',detail:'mother'},{label:'Ambrose',detail:'baptizer'},{label:'Paul',detail:'Scriptural influence'},{label:'Confessions',detail:'writing'},{label:'Grace',detail:'theology'},{label:'Medieval West',detail:'legacy'}]}/></aside></>}
   {tab==='Timeline'&&<article className={styles.fullPanel}><div className="eyebrow">Life timeline</div><h2>Seven turning points</h2><MilestoneRibbon items={timeline.map(([year,detail])=>({year,title:detail.split('.')[0],detail}))}/></article>}
   {tab==='Connections'&&<article className={styles.fullPanel}><div className="eyebrow">Knowledge graph</div><h2>People, places, writings and ideas</h2><RelationshipOrbit center="Augustine" items={connected.slice(0,6).map(({edge,entity})=>({label:entity?text(entity.labels):edge.type,detail:edge.type.replaceAll('_',' ').toLowerCase()}))}/><div className={styles.relationList}>{connected.map(({edge,entity})=>entity&&<div key={edge.id}><span className={styles.icon}>{relationIcons[entity.type]}</span><p><strong>{text(entity.labels)}</strong><small>{entity.subtype}</small></p><em>{edge.type.replaceAll('_',' ')}</em></div>)}</div></article>}
   {tab==='Writings'&&<article className={styles.fullPanel}><div className="eyebrow">Featured writings</div><h2>Works in the graph</h2><div className={styles.books}>{writings.map(({entity})=>entity&&<div key={entity.id}><span>▥</span><h3>{text(entity.labels)}</h3><p>{entity.subtype}</p><b>Open work →</b></div>)}</div></article>}
   {tab==='Sources'&&<article className={styles.fullPanel}><div className="eyebrow">Provenance</div><h2>Evidence behind the profile</h2>{sources.map(source=><div className={styles.source} key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><span>{source.publisher} · {source.sourceType} {source.license?`· ${source.license}`:''}</span></div>)}</article>}
  </section>
 </main>
}

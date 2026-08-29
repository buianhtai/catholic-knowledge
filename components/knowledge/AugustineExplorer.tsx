'use client';

import { useMemo, useState } from 'react';
import { entities, relationships, sources } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';
import styles from './AugustineExplorer.module.css';

type Tab = 'Overview' | 'Timeline' | 'Connections' | 'Writings' | 'Sources';

const timeline = [
  ['354', 'Born in Tagaste in Roman North Africa.'],
  ['383', 'Leaves Carthage for Rome and later Milan.'],
  ['387', 'Baptized in Milan by Ambrose.'],
  ['391', 'Ordained priest at Hippo.'],
  ['395', 'Becomes bishop of Hippo.'],
  ['397', 'Begins composing Confessions.'],
  ['430', 'Dies during the siege of Hippo.'],
];

const relationIcons: Record<string, string> = {
  person: '✦', place: '⌖', work: '▤', concept: '◈', event: '◎', organization: '⌂',
};

export default function AugustineExplorer() {
  const [tab, setTab] = useState<Tab>('Overview');
  const augustine = entities.find((entity) => entity.id === 'person.augustine-of-hippo');
  const connected = useMemo(() => relationships.map((edge) => {
    const otherId = edge.from === augustine?.id ? edge.to : edge.from;
    return { edge, entity: entities.find((item) => item.id === otherId) };
  }).filter((item) => item.entity), [augustine?.id]);
  const writings = connected.filter((item) => item.entity?.type === 'work');

  if (!augustine) return null;

  return (
    <div className={`container ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.portraitPanel}>
          <div className={styles.portrait}>A</div>
          <div className={styles.portraitMeta}><span>Saint · Bishop · Theologian</span><span>354–430</span></div>
        </div>
        <div className={styles.identity}>
          <div className="eyebrow">Entity explorer · Person</div>
          <h1>{text(augustine.labels)}</h1>
          <p>{augustine.summary ? text(augustine.summary) : ''}</p>
          <div className={styles.roles}><span className={styles.chip}>Doctor of the Church</span><span className={styles.chip}>Bishop of Hippo</span><span className={styles.chip}>North Africa</span><span className={styles.chip}>Late Antiquity</span></div>
          <div className={styles.metrics}>
            <div className={styles.metric}><strong>76</strong><span>years of life</span></div>
            <div className={styles.metric}><strong>{relationships.length}</strong><span>seed relationships</span></div>
            <div className={styles.metric}><strong>{writings.length}</strong><span>featured writings</span></div>
            <div className={styles.metric}><strong>28 Aug</strong><span>feast day</span></div>
          </div>
        </div>
      </section>

      <nav className={styles.tabs} aria-label="Augustine sections">
        {(['Overview','Timeline','Connections','Writings','Sources'] as Tab[]).map((name) => (
          <button key={name} className={`${styles.tab} ${tab === name ? styles.active : ''}`} onClick={() => setTab(name)}>{name}</button>
        ))}
      </nav>

      {tab === 'Overview' && <section className={styles.contentGrid}>
        <article className={styles.panel}>
          <div className="eyebrow">At a glance</div><h2>A restless life that became a map of conversion.</h2>
          <p style={{color:'var(--ck-muted)',lineHeight:1.72}}>Augustine's story crosses family, philosophy, migration, friendship, episcopal leadership and writing. Catholic Knowledge treats those connections as first-class content instead of hiding them inside a long article.</p>
          <div className={styles.themeGrid} style={{marginTop:20}}>
            <div className={styles.theme}><strong>Grace</strong><span>Divine action and human freedom.</span></div>
            <div className={styles.theme}><strong>Memory</strong><span>Interior life, desire and conversion.</span></div>
            <div className={styles.theme}><strong>Church</strong><span>Community, authority and sacramental life.</span></div>
          </div>
        </article>
        <aside className={styles.panel}><div className="eyebrow">Why he matters</div><div className={styles.quote}>“One person can be explored as a life, a timeline, a network of influence and a library of ideas.”</div></aside>
      </section>}

      {tab === 'Timeline' && <section className={styles.panel}><div className="eyebrow">Life timeline</div><h2>Seven turning points</h2><div className={styles.timeline}>{timeline.map(([year,body]) => <div className={styles.event} key={year}><div className={styles.year}>{year}</div><div>{body}</div></div>)}</div></section>}

      {tab === 'Connections' && <section className={styles.panel}><div className="eyebrow">Knowledge graph</div><h2>People, places, writings and ideas</h2><div className={styles.relationList}>{connected.map(({edge,entity}) => entity && <div className={styles.relation} key={edge.id}><div className={styles.icon}>{relationIcons[entity.type]}</div><div><strong>{text(entity.labels)}</strong><small>{entity.subtype}</small></div><span className={styles.chip}>{edge.type.replaceAll('_',' ')}</span></div>)}</div></section>}

      {tab === 'Writings' && <section className={styles.contentGrid}><article className={styles.panel}><div className="eyebrow">Featured writings</div><h2>Works in the graph</h2><div className={styles.relationList}>{writings.map(({edge,entity}) => entity && <div className={styles.relation} key={edge.id}><div className={styles.icon}>▤</div><div><strong>{text(entity.labels)}</strong><small>{entity.subtype}</small></div><span className={styles.chip}>Explore</span></div>)}</div></article><aside className={styles.panel}><div className="eyebrow">Product pattern</div><h3>Texts are entities too.</h3><p style={{color:'var(--ck-muted)',lineHeight:1.65}}>A writing can connect to authors, places, historical events, concepts, quotations and later influence without duplicating content.</p></aside></section>}

      {tab === 'Sources' && <section className={styles.panel}><div className="eyebrow">Provenance</div><h2>Review the evidence behind the profile</h2>{sources.map((source) => <div className={styles.source} key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><div>{source.publisher} · {source.sourceType} {source.license ? `· ${source.license}` : ''}</div></div>)}</section>}
    </div>
  );
}

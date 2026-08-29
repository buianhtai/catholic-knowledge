import Link from 'next/link';
import EditorialArtwork from '@/components/media/EditorialArtwork';
import { RelationshipOrbit, VisualFlow } from '@/components/visual/Infographics';
import { entities, getRelations } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';
import styles from './home.module.css';

const augustine = entities.find((entity) => entity.id === 'person.augustine-of-hippo');
const relationCount = getRelations('person.augustine-of-hippo').length;

const categories = [
  { asset:'art.nicaea-icon', title:'The Church', body:'History, structure and mission', href:'/timeline' },
  { asset:'art.augustine-philippe-de-champaigne', title:'Saints', body:'Lives of holiness and virtue', href:'/saints/augustine-of-hippo' },
  { asset:'art.gutenberg-bible', title:'Scripture', body:'Sacred Bible and interpretation', href:'/scripture' },
  { asset:'art.rublev-trinity', title:'Theology', body:'Teachings and doctrinal truths', href:'/doctrine' },
  { asset:'art.nicaea-icon', title:'Councils', body:'Ecumenical councils and decrees', href:'/councils/nicaea' },
  { asset:'art.mass-at-bolsena', title:'Liturgy', body:'Worship, sacraments and prayer', href:'/liturgy' },
  { asset:'art.mass-at-bolsena', title:'Places', body:'Holy sites and pilgrimage', href:'/places' },
  { asset:'art.augustine-philippe-de-champaigne', title:'Knowledge Map', body:'Entities, relationships and sources', href:'/explore' },
];

const railItems = [
  ['⌂  Home','/'],['☩  Jesus to Nicaea','/learn/jesus-to-nicaea'],['♜  Church History','/timeline'],['▤  Scripture','/scripture'],['✦  Saints','/saints/augustine-of-hippo'],['♟  Councils','/councils/nicaea'],['✥  Doctrine','/doctrine'],['♕  Liturgy','/liturgy'],['⌖  Places','/places'],['◎  Knowledge Map','/explore'],['❉  Kids','/kids'],['✧  Ask','/ask'],
] as const;

const topics = [
  { asset:'art.rublev-trinity', label:'The Trinity', href:'/doctrine' },
  { asset:'art.mass-at-bolsena', label:'The Mass', href:'/liturgy' },
  { asset:'art.nicaea-icon', label:'The Early Church', href:'/learn/jesus-to-nicaea' },
  { asset:'art.augustine-philippe-de-champaigne', label:'St. Augustine', href:'/saints/augustine-of-hippo' },
  { asset:'art.nicaea-icon', label:'Council of Nicaea', href:'/councils/nicaea' },
  { asset:'art.mass-at-bolsena', label:'Pilgrimage', href:'/places' },
];

export default function HomePage() {
  return <main className={styles.page}>
    <section className={styles.portal}>
      <aside className={styles.rail}>
        <div className={styles.railBrand}><span className={styles.seal}>☩</span><strong>Catholic<br/>Knowledge</strong></div>
        {railItems.map(([label,href],index)=><Link className={index===0?styles.railActive:styles.railLink} href={href} key={href}>{label}</Link>)}
        <blockquote>“Seek what is true, good, and beautiful. That is the heart of the Catholic intellectual tradition.”<small>— St. Augustine</small></blockquote>
      </aside>

      <div className={styles.workspace}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className="eyebrow">A visual encyclopedia of the Catholic faith</span>
            <h1>Catholic<br/>Knowledge</h1>
            <h2>Explore. Understand. Grow in Truth.</h2>
            <p>A visual and trustworthy guide to Catholic faith, history and culture — connected through people, places, writings, doctrine and events.</p>
            <form className={styles.search} action="/explore"><input name="q" aria-label="Search Catholic Knowledge" placeholder="What do you want to explore?"/><button>Search</button></form>
            <div className={styles.popular}><b>Popular:</b><Link href="/saints/augustine-of-hippo">St. Augustine</Link><Link href="/councils/nicaea">Council of Nicaea</Link><Link href="/doctrine">The Trinity</Link><Link href="/scripture">Scripture</Link></div>
          </div>

          <div className={styles.heroArt}>
            <EditorialArtwork assetId="art.augustine-philippe-de-champaigne" height={430} objectPosition="center 22%" />
            <blockquote>“Our hearts are restless until they rest in You.”<small>— St. Augustine</small></blockquote>
            <Link href="/saints/augustine-of-hippo">Explore his story →</Link>
          </div>

          <aside className={styles.today}>
            <EditorialArtwork assetId="art.mass-at-bolsena" height={150} radius={14} />
            <div className={styles.todayTitle}><div><strong>Today in the Church</strong><small>29 August</small></div></div>
            <h3>Memorial of the Passion of Saint John the Baptist</h3><p>Ordinary Time · Liturgical day</p>
            <div className={styles.todayTools}>{[['Mass Readings'],['Saint of the Day'],['Prayer'],['Liturgy Guide']].map(([label])=><div key={label}><span>{label}</span></div>)}</div>
            <Link className="btn btn-primary" href="/liturgy">View Full Liturgy →</Link>
          </aside>
        </section>

        <section className={styles.categorySection}>
          <div className={styles.sectionTitle}><h2>Explore the Catholic World</h2><Link href="/explore">Open knowledge map →</Link></div>
          <div className={styles.categoryGrid}>{categories.map(({asset,title,body,href})=><Link href={href} className={styles.category} key={title}><div style={{width:76,flex:'0 0 76px'}}><EditorialArtwork assetId={asset} height={76} radius={12} showCredit={false}/></div><div><strong>{title}</strong><small>{body}</small><em>Explore →</em></div></Link>)}</div>
        </section>

        <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:12,marginTop:14}}>
          <article style={{background:'#fffaf1',border:'1px solid #dfd1ba',borderRadius:16,padding:18}}><div className="eyebrow">How knowledge connects</div><h2 style={{font:'30px Georgia,serif',color:'#0b2848',margin:'8px 0 14px'}}>One person opens into an entire world.</h2><RelationshipOrbit center="Augustine" items={[{label:'Monica',detail:'person'},{label:'Ambrose',detail:'person'},{label:'Hippo',detail:'place'},{label:'Confessions',detail:'work'},{label:'Grace',detail:'doctrine'},{label:'Late Antiquity',detail:'era'}]}/></article>
          <article style={{background:'linear-gradient(145deg,#0a2847,#071d34)',borderRadius:16,padding:18,color:'#fff'}}><div className="eyebrow">From source to understanding</div><h2 style={{font:'30px Georgia,serif',margin:'8px 0 18px'}}>Evidence becomes a visual learning path.</h2><VisualFlow steps={[{title:'Source',detail:'trusted text or dataset'},{title:'Fact',detail:'structured canonical knowledge'},{title:'Graph',detail:'people, places and ideas connect'},{title:'Explain',detail:'timeline, diagram, journey or AI'}]}/></article>
        </section>

        <section className={styles.dashboard}>
          <article className={styles.featureCard}><div style={{width:150,float:'right',margin:'0 0 12px 16px'}}><EditorialArtwork assetId="art.augustine-philippe-de-champaigne" height={145} radius={14} showCredit={false}/></div><span className="eyebrow">Featured · St. Augustine of Hippo</span><h2>{augustine?text(augustine.labels):'St. Augustine of Hippo'}</h2><p>Bishop, Doctor of the Church, and one of the most influential thinkers in Christian tradition.</p><div className={styles.stats}><span><b>354–430</b>Years</span><span><b>2</b>Featured writings</span><span><b>{relationCount}</b>Connections</span></div><Link href="/saints/augustine-of-hippo">Explore His Life →</Link></article>
          <Link href="/explore" className={styles.mapCard}><div className={styles.cardHead}><h2>Visual Knowledge Map</h2><span>Interactive</span></div><div className={styles.miniGraph}><i>Grace</i><i>God</i><strong><EditorialArtwork assetId="art.augustine-philippe-de-champaigne" height="100%" radius={999} showCredit={false}/></strong><i>Monica</i><i>Confessions</i><i>Church</i></div><b>Explore Full Graph →</b></Link>
          <Link href="/timeline" className={styles.timelineCard}><h2>Church History Timeline</h2><p>Key moments</p><div className={styles.miniTimeline}>{[['33','Pentecost'],['313','Milan'],['325','Nicaea'],['354','Augustine'],['430','Hippo']].map(([y,l])=><span key={y}><b>{y}</b><small>{l}</small></span>)}</div><b>Explore Timeline →</b></Link>
          <Link href="/learn/jesus-to-nicaea" className={styles.learnCard}><span className="eyebrow">Learning Journey</span><h2>Jesus to Nicaea</h2><EditorialArtwork assetId="art.nicaea-icon" height={150} radius={12} showCredit={false}/><p>Follow the essential journey of our faith in 6 steps.</p><div className={styles.progress}><i/></div><b>Continue Journey →</b></Link>
        </section>

        <section className={styles.bottomGrid}>
          <div className={styles.topics}><h2>Topics You Might Explore</h2><div>{topics.map(({asset,label,href})=><Link href={href} key={label} style={{padding:0,overflow:'hidden'}}><EditorialArtwork assetId={asset} height="100%" radius={0} showCredit={false}/><span style={{position:'absolute',zIndex:1,left:10,right:10,bottom:10,background:'rgba(4,18,34,.72)',padding:'8px 10px',borderRadius:8}}>{label}</span></Link>)}</div></div>
          <aside className={styles.library}><h2>From the Library</h2><div><div style={{width:92,flex:'0 0 92px'}}><EditorialArtwork assetId="art.gutenberg-bible" height={92} radius={10} showCredit={false}/></div><p><b>Confessions</b><small>St. Augustine</small><em>The restless heart and the mercy of God.</em></p></div></aside>
        </section>
      </div>
    </section>
  </main>;
}

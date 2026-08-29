import Link from 'next/link';
import { RelationshipOrbit, VisualFlow } from '@/components/visual/Infographics';
import { entities, getRelations } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';
import styles from './home.module.css';

const augustine = entities.find((entity) => entity.id === 'person.augustine-of-hippo');
const relationCount = getRelations('person.augustine-of-hippo').length;
const categories = [
  ['♜','The Church','History, structure and mission','/timeline'],['✦','Saints','Lives of holiness and virtue','/saints/augustine-of-hippo'],['▤','Scripture','Sacred Bible and interpretation','/scripture'],['✥','Theology','Teachings and doctrinal truths','/doctrine'],['♟','Councils','Ecumenical councils and decrees','/councils/nicaea'],['♕','Liturgy','Worship, sacraments and prayer','/liturgy'],['⌖','Places','Holy sites and pilgrimage','/places'],['▥','Knowledge Map','Entities, relationships and sources','/explore'],
];
const railItems = [
  ['⌂  Home','/'],['☩  Jesus to Nicaea','/learn/jesus-to-nicaea'],['♜  Church History','/timeline'],['▤  Scripture','/scripture'],['✦  Saints','/saints/augustine-of-hippo'],['♟  Councils','/councils/nicaea'],['✥  Doctrine','/doctrine'],['♕  Liturgy','/liturgy'],['⌖  Places','/places'],['◎  Knowledge Map','/explore'],['❉  Kids','/kids'],['✧  Ask','/ask'],
] as const;
const topics = [['✧','The Trinity','/doctrine'],['☩','The Mass','/liturgy'],['♜','The Early Church','/learn/jesus-to-nicaea'],['✦','St. Augustine','/saints/augustine-of-hippo'],['♕','Council of Nicaea','/councils/nicaea'],['⌖','La Vang','/places']];

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
            <form className={styles.search} action="/explore"><input name="q" aria-label="Search Catholic Knowledge" placeholder="What do you want to explore?"/><button>⌕ Search</button></form>
            <div className={styles.popular}><b>Popular:</b><Link href="/saints/augustine-of-hippo">St. Augustine</Link><Link href="/councils/nicaea">Council of Nicaea</Link><Link href="/doctrine">The Trinity</Link><Link href="/scripture">Scripture</Link></div>
          </div>
          <div className={styles.heroArt}>
            <div className={styles.arch}>♜</div><div className={styles.halo}/><div className={styles.saintPortrait}>A</div>
            <blockquote>“Our hearts are restless until they rest in You.”<small>— St. Augustine</small></blockquote>
            <Link href="/saints/augustine-of-hippo">Explore his story →</Link>
          </div>
          <aside className={styles.today}>
            <div className={styles.todayTitle}><span>▣</span><div><strong>Today in the Church</strong><small>29 August</small></div></div>
            <h3>Memorial of the Passion of Saint John the Baptist</h3><p>Ordinary Time · Liturgical day</p>
            <div className={styles.todayTools}>{[['▤','Mass Readings'],['✦','Saint of the Day'],['♕','Prayer'],['▥','Liturgy Guide']].map(([i,l])=><div key={l}><b>{i}</b><span>{l}</span></div>)}</div>
            <Link className="btn btn-primary" href="/liturgy">View Full Liturgy →</Link>
          </aside>
        </section>

        <section className={styles.categorySection}><div className={styles.sectionTitle}><h2>Explore the Catholic World</h2><Link href="/explore">Open knowledge map →</Link></div><div className={styles.categoryGrid}>{categories.map(([icon,title,body,href])=><Link href={href} className={styles.category} key={title}><b>{icon}</b><div><strong>{title}</strong><small>{body}</small><em>Explore →</em></div></Link>)}</div></section>

        <section style={{display:'grid',gridTemplateColumns:'1.05fr .95fr',gap:12,marginTop:14}}>
          <article style={{background:'#fffaf1',border:'1px solid #dfd1ba',borderRadius:16,padding:18}}><div className="eyebrow">How knowledge connects</div><h2 style={{font:'30px Georgia,serif',color:'#0b2848',margin:'8px 0 14px'}}>One entity opens into an entire world.</h2><RelationshipOrbit center="Augustine" items={[{label:'Monica',detail:'person'},{label:'Ambrose',detail:'person'},{label:'Hippo',detail:'place'},{label:'Confessions',detail:'work'},{label:'Grace',detail:'doctrine'},{label:'Late Antiquity',detail:'era'}]}/></article>
          <article style={{background:'linear-gradient(145deg,#0a2847,#071d34)',borderRadius:16,padding:18,color:'#fff'}}><div className="eyebrow">From source to understanding</div><h2 style={{font:'30px Georgia,serif',margin:'8px 0 18px'}}>Evidence becomes a visual learning path.</h2><VisualFlow steps={[{title:'Source',detail:'trusted text or dataset'},{title:'Fact',detail:'structured canonical knowledge'},{title:'Graph',detail:'people, places and ideas connect'},{title:'Explain',detail:'timeline, diagram, journey or AI'}]}/></article>
        </section>

        <section className={styles.dashboard}>
          <article className={styles.featureCard}><span className="eyebrow">Featured · St. Augustine of Hippo</span><h2>{augustine?text(augustine.labels):'St. Augustine of Hippo'}</h2><p>Bishop, Doctor of the Church, and one of the most influential thinkers in Christian tradition.</p><div className={styles.stats}><span><b>354–430</b>Years</span><span><b>2</b>Featured writings</span><span><b>{relationCount}</b>Connections</span></div><Link href="/saints/augustine-of-hippo">Explore His Life →</Link></article>
          <Link href="/explore" className={styles.mapCard}><div className={styles.cardHead}><h2>Visual Knowledge Map</h2><span>Interactive</span></div><div className={styles.miniGraph}><i>Grace</i><i>God</i><strong>A</strong><i>Monica</i><i>Confessions</i><i>Church</i></div><b>Explore Full Graph →</b></Link>
          <Link href="/timeline" className={styles.timelineCard}><h2>Church History Timeline</h2><p>Key moments</p><div className={styles.miniTimeline}>{[['33','Pentecost'],['313','Milan'],['325','Nicaea'],['354','Augustine'],['430','Hippo']].map(([y,l])=><span key={y}><b>{y}</b><small>{l}</small></span>)}</div><b>Explore Timeline →</b></Link>
          <Link href="/learn/jesus-to-nicaea" className={styles.learnCard}><span className="eyebrow">Learning Journey</span><h2>Jesus to Nicaea</h2><div className={styles.jesus}>☩</div><p>Follow the essential journey of our faith in 6 steps.</p><div className={styles.progress}><i/></div><b>Continue Journey →</b></Link>
        </section>

        <section className={styles.bottomGrid}><div className={styles.topics}><h2>Topics You Might Explore</h2><div>{topics.map(([icon,label,href])=><Link href={href} key={label}><b>{icon}</b><span>{label}</span></Link>)}</div></div><aside className={styles.library}><h2>From the Library</h2><div><span className={styles.book}>▥</span><p><b>Confessions</b><small>St. Augustine</small><em>The restless heart and the mercy of God.</em></p></div></aside></section>
      </div>
    </section>
  </main>;
}

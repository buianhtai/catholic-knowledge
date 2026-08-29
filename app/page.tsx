import Link from 'next/link';
import { entities, getRelations } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';
import styles from './home.module.css';

const augustine = entities.find((entity) => entity.id === 'person.augustine-of-hippo');
const relationCount = getRelations('person.augustine-of-hippo').length;

const categories = [
  ['✦', 'Saints'], ['⌘', 'Church History'], ['✝', 'Scripture'], ['◈', 'Councils'], ['◎', 'Doctrine'], ['⌂', 'Places'],
];

const journey = ['Jesus', 'Pentecost', 'Peter & Paul', 'Persecution', 'Constantine', 'Nicaea'];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <div className="eyebrow">Visual Catholic knowledge atlas</div>
          <h1>See the faith as a connected world.</h1>
          <p>
            Explore Scripture, saints, councils, places, writings and doctrine through sourced relationships,
            timelines, visual stories and guided learning — with AI as a guide, never the source of truth.
          </p>
          <form className="search" action="/explore">
            <input aria-label="Search Catholic Knowledge" name="q" placeholder="Search Augustine, Nicaea, Eucharist…" />
            <button className="btn btn-primary" type="submit">Explore knowledge</button>
          </form>
        </div>

        <aside className={styles.heroVisual} aria-label="Featured knowledge story">
          <div className={styles.orbit} />
          <div className={styles.portrait}>A</div>
          <div className={styles.visualTitle}>
            <div className="eyebrow">Featured knowledge story</div>
            <h2>{augustine ? text(augustine.labels) : 'St. Augustine of Hippo'}</h2>
            <p>{augustine?.summary ? text(augustine.summary) : 'A connected life through people, places, writings and ideas.'}</p>
            <Link className="btn btn-secondary" href="/saints/augustine-of-hippo">Open visual story →</Link>
          </div>
          <div className={styles.nodeRow}>
            <div className={styles.node}><strong>Monica</strong><span>mother</span></div>
            <div className={styles.node}><strong>Ambrose</strong><span>baptized by</span></div>
            <div className={styles.node}><strong>Confessions</strong><span>wrote</span></div>
            <div className={styles.node}><strong>{relationCount} links</strong><span>seed graph</span></div>
          </div>
        </aside>
      </section>

      <section className="container section">
        <div className={styles.quickGrid}>
          <article className={`${styles.panel} ${styles.today}`}>
            <div className={styles.calendar}>29</div>
            <div>
              <div className="eyebrow">Today in the Church</div>
              <h3>Enter through the liturgical day</h3>
              <p>Readings, feast, saint, season and related people or places become entry points into the wider graph.</p>
            </div>
          </article>
          <Link className={styles.panel} href="/explore">
            <div className="eyebrow">Explore</div><h3>Follow connections</h3>
            <p>Trace people, places, writings and ideas through an interactive knowledge map.</p>
          </Link>
          <Link className={styles.panel} href="/learn/jesus-to-nicaea">
            <div className="eyebrow">Learn</div><h3>Guided journeys</h3>
            <p>Move through history as a visual sequence rather than a wall of text.</p>
          </Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div><div className="eyebrow">Explore by lens</div><h2>One world, many ways in.</h2></div>
          <p>The same canonical knowledge powers category browsing, graph views, timelines, stories and grounded explanations.</p>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map(([icon, label]) => (
            <Link href="/explore" className={styles.category} key={label}>
              <span className={styles.categoryIcon}>{icon}</span><strong>{label}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className={styles.journey}>
          <div>
            <div className="eyebrow">Featured learning journey</div>
            <h2 style={{fontFamily:'Georgia, serif', fontSize:38, margin:'10px 0'}}>From Jesus to Nicaea</h2>
            <p style={{color:'var(--ck-muted)', lineHeight:1.65}}>Follow six milestones to understand how the early Church spread, faced persecution and articulated the Nicene faith.</p>
            <Link className="btn btn-primary" href="/learn/jesus-to-nicaea">Start journey →</Link>
          </div>
          <div className={styles.path}>
            {journey.map((item, index) => <div className={styles.step} key={item}><div className={styles.dot}>{index + 1}</div><span>{item}</span></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}

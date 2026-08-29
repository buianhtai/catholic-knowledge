import Link from 'next/link';
import { entities, getRelations } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';

const augustine = entities.find((entity) => entity.id === 'person.augustine-of-hippo');
const relationCount = getRelations('person.augustine-of-hippo').length;

const discoveryCards = [
  {
    kicker: 'Explore a life',
    title: 'Augustine: from restless seeker to bishop',
    body: 'Move through people, places, writings and ideas as one connected visual story.',
    href: '/saints/augustine-of-hippo',
  },
  {
    kicker: 'Trace connections',
    title: 'See knowledge as a graph',
    body: 'Follow meaningful relationships across saints, councils, writings, doctrine and history.',
    href: '/explore',
  },
  {
    kicker: 'Learn visually',
    title: 'From Jesus to Nicaea',
    body: 'A guided path through the early Church, designed around milestones instead of long articles.',
    href: '/learn/jesus-to-nicaea',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="container hero">
        <div>
          <div className="eyebrow">Visual Catholic knowledge atlas</div>
          <h1>See how the Catholic world connects.</h1>
          <p>
            Explore Scripture, saints, history, councils, places, writings and doctrine through sourced
            relationships, timelines and visual stories — with AI as a guide, never the source of truth.
          </p>
          <form className="search" action="/explore">
            <input aria-label="Search Catholic Knowledge" name="q" placeholder="Search Augustine, Nicaea, Eucharist…" />
            <button className="btn btn-primary" type="submit">Explore knowledge</button>
          </form>
        </div>

        <aside className="hero-card" aria-label="Featured entity">
          <div>
            <div className="eyebrow">Featured knowledge story</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 42, margin: '18px 0 12px', maxWidth: 440 }}>
              {augustine ? text(augustine.labels) : 'St. Augustine of Hippo'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,.72)', lineHeight: 1.65, maxWidth: 500 }}>
              {augustine?.summary ? text(augustine.summary) : 'Explore a connected life through people, places, writings and ideas.'}
            </p>
          </div>
          <div>
            <div className="metric-row">
              <div className="metric"><strong>354</strong><span>born in Tagaste</span></div>
              <div className="metric"><strong>{relationCount}</strong><span>seed relationships</span></div>
              <div className="metric"><strong>EN / VI</strong><span>one canonical identity</span></div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Link className="btn btn-secondary" href="/saints/augustine-of-hippo">Open entity explorer →</Link>
            </div>
          </div>
        </aside>
      </section>

      <section className="container section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Three ways in</div>
            <h2>Discover. Connect. Understand.</h2>
          </div>
          <p>One canonical knowledge model can become an article, graph, timeline, story, lesson or grounded explanation.</p>
        </div>
        <div className="grid">
          {discoveryCards.map((card) => (
            <Link className="card" href={card.href} key={card.title}>
              <div className="card-kicker">{card.kicker}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

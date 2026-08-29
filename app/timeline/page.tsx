import Link from 'next/link';

const milestones = [
  { year: '30s', title: 'The apostolic Church', era: 'Origins', body: 'The first Christian communities form around the witness to Jesus, the apostles, prayer, teaching and the breaking of bread.' },
  { year: '325', title: 'Council of Nicaea', era: 'Imperial Christianity', body: 'Bishops gather at Nicaea and confess the Son as true God from true God, shaping the Nicene faith.' },
  { year: '1054', title: 'East–West rupture', era: 'Medieval Church', body: 'Long-standing theological, political and ecclesial tensions harden into a major rupture between Rome and Constantinople.' },
  { year: '1545', title: 'Council of Trent', era: 'Reformation era', body: 'The Catholic Church responds to the Reformation with doctrinal clarification and major reforms in formation and discipline.' },
  { year: '1962', title: 'Second Vatican Council', era: 'Modern Church', body: 'Vatican II renews the Church’s engagement with Scripture, liturgy, ecumenism and the modern world.' },
  { year: 'Today', title: 'A global Catholic Church', era: 'Contemporary', body: 'Catholic life spans cultures and continents while remaining connected through worship, teaching, memory and mission.' },
];

export default function TimelinePage() {
  return (
    <main className="container section">
      <div className="eyebrow">Church History</div>
      <div className="section-heading" style={{ alignItems: 'start', marginTop: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(46px, 7vw, 82px)', lineHeight: .98, margin: 0 }}>Two thousand years, visually connected.</h1>
        </div>
        <p>Move through turning points, then jump from an event into the people, places, documents and doctrines around it.</p>
      </div>

      <section style={{ marginTop: 38, display: 'grid', gap: 18 }}>
        {milestones.map((item, index) => (
          <article className="card" key={item.year} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 24, alignItems: 'center' }}>
            <div>
              <div className="card-kicker">{item.era}</div>
              <strong style={{ display: 'block', fontFamily: 'Georgia, serif', fontSize: 34, marginTop: 7 }}>{item.year}</strong>
            </div>
            <div>
              <h2 style={{ margin: '0 0 8px', fontSize: 24 }}>{item.title}</h2>
              <p style={{ margin: 0, color: 'var(--ck-muted)', lineHeight: 1.65 }}>{item.body}</p>
            </div>
            <div style={{ minWidth: 120, textAlign: 'right', color: 'var(--ck-gold)', fontWeight: 800 }}>0{index + 1}</div>
          </article>
        ))}
      </section>

      <section className="card" style={{ marginTop: 22, background: 'var(--ck-ink)', color: '#fff', display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'center' }}>
        <div>
          <div className="eyebrow">Guided story</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 32, margin: '10px 0' }}>Start with the early Church.</h2>
          <p style={{ color: 'rgba(255,255,255,.7)', margin: 0 }}>Follow the journey from Jesus and the apostles to the Council of Nicaea.</p>
        </div>
        <Link className="btn btn-secondary" href="/learn/jesus-to-nicaea">Begin journey →</Link>
      </section>
    </main>
  );
}

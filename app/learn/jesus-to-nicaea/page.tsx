'use client';

import { useState } from 'react';

const steps = [
  ['Jesus and the apostles', 'The story begins with Jesus, his proclamation of the Kingdom, and the disciples who become witnesses.'],
  ['Pentecost', 'The disciples proclaim the Gospel publicly and the Church’s missionary life accelerates.'],
  ['Peter, Paul and mission', 'Christian communities spread through the Mediterranean world and face new pastoral questions.'],
  ['Persecution and growth', 'Martyrdom, apologetics and local communities shape Christian identity across the Roman Empire.'],
  ['Constantine and a changing world', 'Imperial toleration changes the Church’s public situation and makes large councils possible.'],
  ['Council of Nicaea', 'Bishops gather in 325 to address the Arian controversy and articulate the Church’s confession of Christ.'],
] as const;

export default function JesusToNicaeaPage() {
  const [active, setActive] = useState(0);
  const progress = ((active + 1) / steps.length) * 100;

  return (
    <main className="container section">
      <div className="eyebrow">Guided learning journey</div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: .98, margin: '12px 0 16px' }}>From Jesus to Nicaea</h1>
      <p style={{ maxWidth: 760, color: 'var(--ck-muted)', fontSize: 18, lineHeight: 1.7 }}>Six visual milestones that connect people, events and ideas instead of treating Church history as isolated dates.</p>

      <div style={{ margin: '28px 0 34px' }}>
        <div style={{ height: 8, borderRadius: 999, background: 'var(--ck-surface-strong)', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--ck-gold)', transition: 'width .25s ease' }} />
        </div>
        <div style={{ marginTop: 8, color: 'var(--ck-muted)', fontSize: 13 }}>Part {active + 1} of {steps.length}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, .7fr) minmax(0, 1.3fr)', gap: 22 }}>
        <nav className="card" aria-label="Journey steps" style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
          {steps.map(([title], index) => (
            <button key={title} onClick={() => setActive(index)} style={{ textAlign: 'left', border: 0, borderRadius: 14, padding: '14px 16px', cursor: 'pointer', background: active === index ? 'var(--ck-ink)' : 'transparent', color: active === index ? '#fff' : 'var(--ck-ink)', fontWeight: 800 }}>
              <span style={{ color: active === index ? 'var(--ck-gold)' : 'var(--ck-muted)', marginRight: 10 }}>0{index + 1}</span>{title}
            </button>
          ))}
        </nav>

        <article className="hero-card" style={{ minHeight: 460 }}>
          <div>
            <div className="eyebrow">Milestone {active + 1}</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 48, lineHeight: 1.05, margin: '18px 0' }}>{steps[active][0]}</h2>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 18, lineHeight: 1.7 }}>{steps[active][1]}</p>
          </div>
          <div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="btn btn-secondary">People</span>
              <span className="btn btn-secondary">Events</span>
              <span className="btn btn-secondary">Sources</span>
            </div>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <button className="btn btn-secondary" disabled={active === 0} onClick={() => setActive((v) => Math.max(0, v - 1))}>← Previous</button>
              <button className="btn btn-secondary" disabled={active === steps.length - 1} onClick={() => setActive((v) => Math.min(steps.length - 1, v + 1))}>Next →</button>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

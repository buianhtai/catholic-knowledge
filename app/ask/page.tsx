'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

const sample = {
  question: 'Why was the Council of Nicaea important?',
  answer: 'Nicaea was important because bishops from across the Church gathered in 325 to address a major dispute about the identity of Christ. The council rejected the claim that the Son was a created being and confessed the Son as true God from true God, giving the Church a shared doctrinal formula that became foundational to the Nicene Creed.',
  evidence: [
    { title: 'Council of Nicaea (325)', type: 'Event', detail: 'First ecumenical council; central to the Arian controversy.' },
    { title: 'Nicene Creed', type: 'Work', detail: 'Creedal formula developed from the council’s confession of Christ.' },
    { title: 'Arius and the Arian controversy', type: 'Context', detail: 'The theological dispute that precipitated the council.' },
  ],
};

export default function AskPage() {
  const [question, setQuestion] = useState(sample.question);
  const [submitted, setSubmitted] = useState(sample.question);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(question.trim() || sample.question);
  }

  return (
    <main className="container section">
      <div className="eyebrow">Grounded Catholic Knowledge</div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(50px, 7vw, 86px)', lineHeight: .98, margin: '12px 0 18px' }}>Ask, then inspect the evidence.</h1>
      <p style={{ maxWidth: 760, color: 'var(--ck-muted)', fontSize: 18, lineHeight: 1.7 }}>The assistant explains canonical knowledge and points back to entities, relationships and sources. AI is the guide—not the source of truth.</p>

      <form onSubmit={submit} className="search" style={{ maxWidth: 900 }}>
        <input value={question} onChange={(event) => setQuestion(event.target.value)} aria-label="Ask Catholic Knowledge" />
        <button className="btn btn-primary" type="submit">Ask</button>
      </form>

      <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, .65fr)', gap: 22 }}>
        <article className="card">
          <div className="card-kicker">Explanation</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 34, margin: '12px 0' }}>{submitted}</h2>
          <p style={{ color: 'var(--ck-muted)', fontSize: 17, lineHeight: 1.8 }}>{sample.answer}</p>
          <div style={{ borderTop: '1px solid var(--ck-line)', marginTop: 24, paddingTop: 18 }}>
            <strong>What you can do next</strong>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <Link className="btn btn-secondary" href="/explore">Explore connections</Link>
              <Link className="btn btn-secondary" href="/timeline">Open timeline</Link>
              <Link className="btn btn-secondary" href="/learn/jesus-to-nicaea">Learn the story</Link>
            </div>
          </div>
        </article>

        <aside className="card">
          <div className="card-kicker">Grounding context</div>
          <h2 style={{ margin: '10px 0 16px' }}>Evidence used</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {sample.evidence.map((item) => (
              <div key={item.title} style={{ border: '1px solid var(--ck-line)', borderRadius: 16, padding: 15 }}>
                <div style={{ color: 'var(--ck-gold)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em' }}>{item.type}</div>
                <strong style={{ display: 'block', marginTop: 5 }}>{item.title}</strong>
                <p style={{ margin: '7px 0 0', color: 'var(--ck-muted)', lineHeight: 1.55, fontSize: 14 }}>{item.detail}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 18, color: 'var(--ck-muted)', fontSize: 12 }}>MVP shell: retrieval is deterministic/mock. A provider adapter can later call Workers AI or Gemini after canonical retrieval.</p>
        </aside>
      </div>
    </main>
  );
}

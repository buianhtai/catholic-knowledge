import styles from './infographics.module.css';

type OrbitItem={label:string;detail?:string};
type FlowStep={title:string;detail:string};
type Milestone={year:string;title:string;detail?:string};

export function RelationshipOrbit({center,items}:{center:string;items:OrbitItem[]}){
  const positions=[[50,8],[82,28],[80,70],[50,88],[18,70],[18,28]];
  return <div className={styles.orbit} aria-label={`${center} relationship diagram`}>
    <svg className={styles.orbitLines} viewBox="0 0 100 100" aria-hidden="true">
      {items.slice(0,6).map((_,i)=><line key={i} x1="50" y1="50" x2={positions[i][0]} y2={positions[i][1]} />)}
      <circle cx="50" cy="50" r="28"/>
    </svg>
    <div className={styles.orbitCenter}><strong>{center}</strong><small>connected knowledge</small></div>
    {items.slice(0,6).map((item,i)=><div key={item.label} className={styles.orbitNode} style={{left:`${positions[i][0]}%`,top:`${positions[i][1]}%`}}><strong>{item.label}</strong>{item.detail&&<small>{item.detail}</small>}</div>)}
  </div>
}

export function VisualFlow({steps}:{steps:FlowStep[]}){
  return <div className={styles.flow}>{steps.map((step,i)=><div className={styles.flowStep} key={step.title}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{step.title}</strong><small>{step.detail}</small></div>{i<steps.length-1&&<b aria-hidden="true">→</b>}</div>)}</div>
}

export function MilestoneRibbon({items}:{items:Milestone[]}){
  return <div className={styles.ribbon}>{items.map((item,i)=><div className={styles.milestone} key={`${item.year}-${item.title}`}><span>{item.year}</span><i/><strong>{item.title}</strong>{item.detail&&<small>{item.detail}</small>}{i<items.length-1&&<em/>}</div>)}</div>
}

export function FactWheel({center,items}:{center:string;items:string[]}){
  return <div className={styles.wheel}>
    <div className={styles.wheelCore}>{center}</div>
    {items.slice(0,6).map((item,i)=><div key={item} className={`${styles.wheelItem} ${styles[`wheel${i+1}`]}`}>{item}</div>)}
  </div>
}

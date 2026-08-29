import styles from './infographics.module.css';

type OrbitItem={label:string;detail?:string};
type FlowStep={title:string;detail:string};
type Milestone={year:string;title:string;detail?:string};
type MapPoint={label:string;region:string;x:number;y:number;accent?:boolean};

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

export function GeoStoryMap({points}:{points:MapPoint[]}){
  return <div className={styles.geoMap} aria-label="Catholic places map">
    <svg viewBox="0 0 100 58" className={styles.geoSvg} aria-hidden="true">
      <path d="M5 18 C14 9,27 10,34 16 C39 21,36 27,28 28 C21 29,18 36,12 33 C7 30,3 24,5 18 Z"/>
      <path d="M39 16 C47 8,62 8,68 14 C72 18,69 23,63 24 C59 25,58 31,54 35 C50 39,43 37,43 31 C43 26,35 23,39 16 Z"/>
      <path d="M68 17 C76 12,91 15,94 23 C97 31,88 34,83 31 C77 27,74 32,71 29 C68 26,64 20,68 17 Z"/>
      <path d="M78 40 C84 37,91 40,92 46 C92 51,86 53,81 50 C77 48,74 43,78 40 Z"/>
      {points.map((p,i)=>i<points.length-1?<line key={`l${p.label}`} x1={p.x} y1={p.y} x2={points[i+1].x} y2={points[i+1].y}/>:null)}
    </svg>
    {points.map(p=><div key={p.label} className={`${styles.geoPoint} ${p.accent?styles.geoAccent:''}`} style={{left:`${p.x}%`,top:`${p.y/58*100}%`}}><i/><strong>{p.label}</strong><small>{p.region}</small></div>)}
  </div>
}

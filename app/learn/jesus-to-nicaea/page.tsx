'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import EditorialArtwork from '@/components/media/EditorialArtwork';
import styles from './journey.module.css';

const chapters = [
  {year:'k. 30',kicker:'Khởi nguyên',title:'Chúa Giêsu và các Tông đồ',body:'Từ Galilê đến Giêrusalem, lời rao giảng Nước Thiên Chúa quy tụ một cộng đoàn môn đệ. Từ đây, một câu chuyện sẽ lan vượt khỏi biên giới của một vùng đất.',asset:'art.gutenberg-bible',nodes:['Galilê','Nhóm Mười Hai','Giêrusalem','Tin Mừng'],tone:196},
  {year:'k. 30',kicker:'Ngọn lửa',title:'Lễ Ngũ Tuần',body:'Các môn đệ bước ra khỏi căn phòng đóng kín. Việc loan báo Tin Mừng trở thành một sứ mạng công khai và cộng đoàn Giáo Hội bắt đầu mở rộng.',asset:'art.mass-at-bolsena',nodes:['Chúa Thánh Thần','Phêrô','Phép Rửa','Công vụ'],tone:220},
  {year:'30–60',kicker:'Những con đường',title:'Phêrô, Phaolô và sứ mạng',body:'Từ Giêrusalem, Antiôkia đến Rôma, những con đường của Địa Trung Hải trở thành mạng lưới truyền giáo. Những cộng đoàn mới đặt ra những câu hỏi mới về đức tin và đời sống.',asset:'art.gutenberg-bible',nodes:['Phêrô','Phaolô','Antiôkia','Rôma'],tone:174},
  {year:'64–303',kicker:'Chứng tá',title:'Bách hại và tăng trưởng',body:'Đức tin không lớn lên trong an toàn. Chứng tá của các vị tử đạo, các nhà hộ giáo và những Giáo hội địa phương làm cho căn tính Kitô giáo ngày càng rõ nét.',asset:'art.nicaea-icon',nodes:['Các vị tử đạo','Hộ giáo','Rôma','Giáo hội địa phương'],tone:130},
  {year:'313',kicker:'Bước ngoặt',title:'Constantinô và một thế giới đổi thay',body:'Khi Kitô hữu có thể sống đức tin công khai hơn, Giáo Hội bước vào một không gian lịch sử mới. Những tranh luận thần học giờ đây có thể quy tụ các giám mục từ nhiều miền.',asset:'art.nicaea-icon',nodes:['Constantinô','Milan','Giám mục','Đế quốc'],tone:164},
  {year:'325',kicker:'Hội tụ',title:'Công đồng Nixêa',body:'Tại Nixêa, các giám mục đối diện một câu hỏi quyết định về căn tính của Đức Kitô. Kinh Tin Kính trở thành một điểm sáng kết nối các cộng đoàn trong cùng một lời tuyên xưng.',asset:'art.nicaea-icon',nodes:['Nixêa','Ariô','Athanasiô','Kinh Tin Kính'],tone:246},
] as const;

type SoundEngine={ctx:AudioContext;gain:GainNode;osc:OscillatorNode;harmonic:OscillatorNode};

export default function JesusToNicaeaPage(){
 const [active,setActive]=useState(0);
 const [soundOn,setSoundOn]=useState(false);
 const [soundReady,setSoundReady]=useState(false);
 const sceneRefs=useRef<(HTMLElement|null)[]>([]);
 const soundRef=useRef<SoundEngine|null>(null);
 useEffect(()=>{
   const observer=new IntersectionObserver(entries=>{
     const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
     if(visible){const index=Number((visible.target as HTMLElement).dataset.index);if(!Number.isNaN(index))setActive(index)}
   },{threshold:[.35,.55,.75]});
   sceneRefs.current.forEach(el=>el&&observer.observe(el));
   return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
   const engine=soundRef.current;if(!engine)return;
   const now=engine.ctx.currentTime;const base=chapters[active].tone;
   engine.osc.frequency.cancelScheduledValues(now);engine.harmonic.frequency.cancelScheduledValues(now);
   engine.osc.frequency.linearRampToValueAtTime(base,now+1.6);engine.harmonic.frequency.linearRampToValueAtTime(base*1.5,now+1.8);
 },[active]);
 useEffect(()=>()=>{const engine=soundRef.current;if(engine){engine.osc.stop();engine.harmonic.stop();void engine.ctx.close()}},[]);
 const jump=(index:number)=>sceneRefs.current[index]?.scrollIntoView({behavior:'smooth',block:'start'});
 const toggleSound=async()=>{
   if(!soundRef.current){
     const AudioCtx=window.AudioContext||(window as typeof window&{webkitAudioContext:typeof AudioContext}).webkitAudioContext;
     const ctx=new AudioCtx();const gain=ctx.createGain();const filter=ctx.createBiquadFilter();const osc=ctx.createOscillator();const harmonic=ctx.createOscillator();
     filter.type='lowpass';filter.frequency.value=720;gain.gain.value=0;
     osc.type='sine';harmonic.type='triangle';osc.frequency.value=chapters[active].tone;harmonic.frequency.value=chapters[active].tone*1.5;
     const harmonicGain=ctx.createGain();harmonicGain.gain.value=.13;
     osc.connect(filter);harmonic.connect(harmonicGain);harmonicGain.connect(filter);filter.connect(gain);gain.connect(ctx.destination);osc.start();harmonic.start();
     soundRef.current={ctx,gain,osc,harmonic};setSoundReady(true);
   }
   const engine=soundRef.current!;if(engine.ctx.state==='suspended')await engine.ctx.resume();
   const now=engine.ctx.currentTime;engine.gain.gain.cancelScheduledValues(now);
   const next=!soundOn;engine.gain.gain.linearRampToValueAtTime(next?.055:0,now+.8);setSoundOn(next);
 };
 return <main className={styles.page}>
   <div className={styles.sky} aria-hidden="true"><div className={styles.nebula}/><div className={styles.starfield}/><div className={styles.dust}/></div>
   <header className={styles.top}><Link href="/">☩ <span>Catholic Knowledge</span></Link><div className={styles.topActions}><button className={styles.soundToggle} onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn?'Tắt âm thanh hành trình':'Bật âm thanh hành trình'}><i className={soundOn?styles.soundLive:''}/>{soundOn?'Âm thanh: bật':soundReady?'Âm thanh: tắt':'Bật không gian âm thanh'}</button><div><span>Hành trình 01</span><b>{chapters[active].year}</b></div></div></header>

   <section className={styles.prologue}>
     <div className={styles.prologueCopy}><span>Hành trình xuyên qua lịch sử đức tin</span><h1>Từ Chúa Giêsu<br/><em>đến Nixêa</em></h1><p>Đừng đọc lịch sử như một danh sách ngày tháng. Hãy đi xuyên qua một mạng lưới sống động của con người, địa danh, biến cố và ý tưởng.</p><div className={styles.prologueActions}><button onClick={()=>jump(0)}>Bắt đầu hành trình ↓</button><button className={styles.soundIntro} onClick={toggleSound}>{soundOn?'Tắt không gian âm thanh':'Bật không gian âm thanh ♫'}</button></div></div>
     <div className={styles.origin} aria-hidden="true"><i/><b>Khởi đầu</b><span>k. 30</span></div>
   </section>

   <div className={styles.journey}>
     <aside className={styles.timeline} aria-label="Dòng thời gian hành trình">
       <span className={styles.timelineLabel}>30 → 325</span><div className={styles.timelineTrack}><i style={{height:`${(active/(chapters.length-1))*100}%`}}/></div>
       {chapters.map((chapter,index)=><button key={chapter.title} onClick={()=>jump(index)} className={index===active?styles.timelineActive:''}><span>{chapter.year}</span><small>{chapter.kicker}</small></button>)}
     </aside>
     <div className={styles.scenes}>
       {chapters.map((chapter,index)=><section ref={el=>{sceneRefs.current[index]=el}} data-index={index} key={chapter.title} className={`${styles.scene} ${index===active?styles.sceneActive:''}`}>
         <div className={styles.sceneArt}><EditorialArtwork assetId={chapter.asset} height={900} radius={0} showCredit={false}/><div className={styles.sceneShade}/></div>
         <div className={styles.sceneCopy}><span className={styles.kicker}>{chapter.kicker} · {chapter.year}</span><div className={styles.sceneNumber}>{String(index+1).padStart(2,'0')}</div><h2>{chapter.title}</h2><p>{chapter.body}</p><div className={styles.constellation}>{chapter.nodes.map((node,nodeIndex)=><span style={{animationDelay:`${nodeIndex*100}ms`}} key={node}><i/> {node}</span>)}</div>{index===chapters.length-1&&<Link className={styles.enter} href="/cong-dong/nixea">Bước vào Công đồng Nixêa →</Link>}</div>
         <div className={styles.depth} aria-hidden="true">{chapter.nodes.map((node,nodeIndex)=><span key={node} style={{'--x':`${18+(nodeIndex*21)%68}%`,'--y':`${16+(nodeIndex*27)%72}%`,'--d':`${.65+nodeIndex*.12}`} as React.CSSProperties}>{node}</span>)}</div>
       </section>)}
     </div>
   </div>
   <section className={styles.epilogue}><div className={styles.pullback}><span>325</span><i/><i/><i/><i/><i/><i/><i/></div><div><span>Đây chỉ là một chòm sao.</span><h2>Cả đức tin là<br/>một vũ trụ kết nối.</h2><p>Mỗi con người mở ra một địa danh. Mỗi địa danh mở ra một biến cố. Mỗi biến cố dẫn đến giáo lý, tác phẩm và những hành trình khác.</p><Link href="/kham-pha">Bay ra bản đồ tri thức →</Link></div></section>
 </main>
}

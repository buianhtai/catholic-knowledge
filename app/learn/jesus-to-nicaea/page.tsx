'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import EditorialArtwork from '@/components/media/EditorialArtwork';
import JourneyStarfield from '@/components/journey/JourneyStarfield';
import { toExploreHref } from '@/lib/knowledge/exploration-context';
import styles from './journey.module.css';

const chapters = [
  {id:'chapter-1',year:'k. 30',kicker:'Khởi nguyên',title:'Chúa Giêsu và các Tông đồ',body:'Từ Galilê đến Giêrusalem, lời rao giảng về Nước Thiên Chúa quy tụ một cộng đoàn môn đệ. Từ đây, Tin Mừng bắt đầu lan vượt ra ngoài biên giới của một vùng đất.',asset:'place.jerusalem-holy-sepulchre',nodes:['Galilê','Nhóm Mười Hai','Giêrusalem','Tin Mừng'],tone:196},
  {id:'chapter-2',year:'k. 30',kicker:'Ngọn lửa',title:'Lễ Ngũ Tuần',body:'Các môn đệ bước ra khỏi căn phòng đóng kín. Việc loan báo Tin Mừng trở thành một sứ mạng công khai, và cộng đoàn Giáo Hội bắt đầu mở rộng.',asset:'person.peter',nodes:['Chúa Thánh Thần','Phêrô','Phép Rửa','Công vụ'],tone:220},
  {id:'chapter-3',year:'30–60',kicker:'Những con đường',title:'Phêrô, Phaolô và sứ mạng',body:'Từ Giêrusalem, Antiôkia đến Rôma, các tuyến đường quanh Địa Trung Hải trở thành mạng lưới truyền giáo. Những cộng đoàn mới cũng đặt ra những câu hỏi mới về đức tin và đời sống Kitô hữu.',asset:'person.paul',nodes:['Phêrô','Phaolô','Antiôkia','Rôma'],tone:174},
  {id:'chapter-4',year:'64–303',kicker:'Chứng tá',title:'Bách hại và tăng trưởng',body:'Đức tin không lớn lên trong an toàn. Chứng tá của các vị tử đạo, các nhà hộ giáo và các Giáo Hội địa phương góp phần làm cho căn tính Kitô giáo ngày càng rõ nét.',asset:'art.gutenberg-bible',nodes:['Các vị tử đạo','Hộ giáo','Rôma','Giáo Hội địa phương'],tone:130},
  {id:'chapter-5',year:'313',kicker:'Bước ngoặt',title:'Constantinô và một thế giới đổi thay',body:'Khi các Kitô hữu có thể công khai sống đức tin hơn, Giáo Hội bước vào một giai đoạn lịch sử mới. Những tranh luận thần học giờ đây có thể quy tụ các giám mục từ nhiều miền khác nhau.',asset:'person.constantine',nodes:['Constantinô','Milan','Giám mục','Đế quốc'],tone:164},
  {id:'chapter-6',year:'325',kicker:'Hội tụ',title:'Công đồng Nixêa',body:'Tại Nixêa, các giám mục đối diện với một câu hỏi mang tính quyết định về căn tính của Đức Kitô. Kinh Tin Kính trở thành điểm quy tụ giúp các cộng đoàn cùng tuyên xưng một đức tin.',asset:'art.nicaea-icon',nodes:['Nixêa','Ariô','Athanasiô','Kinh Tin Kính'],tone:246},
] as const;

type SoundEngine={ctx:AudioContext;gain:GainNode;osc:OscillatorNode;harmonic:OscillatorNode};

export default function JesusToNicaeaPage(){
 const [active,setActive]=useState(0);
 const [soundOn,setSoundOn]=useState(false);
 const [soundReady,setSoundReady]=useState(false);
 const sceneRefs=useRef<(HTMLElement|null)[]>([]);
 const soundRef=useRef<SoundEngine|null>(null);
 const journeyProgressRef=useRef(0);

 useEffect(()=>{
   const hash=window.location.hash.replace('#','');
   const hashIndex=chapters.findIndex(chapter=>chapter.id===hash);
   if(hashIndex>=0)requestAnimationFrame(()=>sceneRefs.current[hashIndex]?.scrollIntoView({block:'start'}));
   const observer=new IntersectionObserver(entries=>{
     const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
     if(visible){
       const index=Number((visible.target as HTMLElement).dataset.index);
       if(!Number.isNaN(index)){
         journeyProgressRef.current=index/Math.max(1,chapters.length-1);
         setActive(index);
       }
     }
   },{threshold:[.4,.6,.78]});
   sceneRefs.current.forEach(el=>el&&observer.observe(el));
   return()=>observer.disconnect();
 },[]);

 useEffect(()=>{
   const engine=soundRef.current;
   if(!engine)return;
   const now=engine.ctx.currentTime;
   const base=chapters[active].tone;
   engine.osc.frequency.cancelScheduledValues(now);
   engine.harmonic.frequency.cancelScheduledValues(now);
   engine.osc.frequency.linearRampToValueAtTime(base,now+1.6);
   engine.harmonic.frequency.linearRampToValueAtTime(base*1.5,now+1.8);
 },[active]);

 useEffect(()=>()=>{
   const engine=soundRef.current;
   if(engine){engine.osc.stop();engine.harmonic.stop();void engine.ctx.close()}
 },[]);

 const jump=(index:number)=>sceneRefs.current[index]?.scrollIntoView({behavior:'smooth',block:'start'});
 const toggleSound=async()=>{
   if(!soundRef.current){
     const AudioCtx=window.AudioContext||(window as typeof window&{webkitAudioContext:typeof AudioContext}).webkitAudioContext;
     const ctx=new AudioCtx();
     const gain=ctx.createGain();
     const filter=ctx.createBiquadFilter();
     const osc=ctx.createOscillator();
     const harmonic=ctx.createOscillator();
     filter.type='lowpass';filter.frequency.value=720;gain.gain.value=0;osc.type='sine';harmonic.type='triangle';
     osc.frequency.value=chapters[active].tone;harmonic.frequency.value=chapters[active].tone*1.5;
     const harmonicGain=ctx.createGain();harmonicGain.gain.value=.13;
     osc.connect(filter);harmonic.connect(harmonicGain);harmonicGain.connect(filter);filter.connect(gain);gain.connect(ctx.destination);
     osc.start();harmonic.start();soundRef.current={ctx,gain,osc,harmonic};setSoundReady(true);
   }
   const engine=soundRef.current!;
   if(engine.ctx.state==='suspended')await engine.ctx.resume();
   const now=engine.ctx.currentTime;
   engine.gain.gain.cancelScheduledValues(now);
   const next=!soundOn;
   engine.gain.gain.linearRampToValueAtTime(next?.045:0,now+.8);
   setSoundOn(next);
 };

 return <main className={styles.page}>
   <div className={styles.ambient} aria-hidden="true"><JourneyStarfield progressRef={journeyProgressRef}/></div>

   <header className={styles.topbar}>
     <Link href="/" className={styles.brand}>☩ <span>Catholic Knowledge</span></Link>
     <div className={styles.headerProgress}><span>Hành trình 01</span><b>{String(active+1).padStart(2,'0')} / {String(chapters.length).padStart(2,'0')}</b></div>
     <button className={styles.soundToggle} onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn?'Tắt âm thanh hành trình':'Bật âm thanh hành trình'}><i className={soundOn?styles.soundLive:''}/>{soundOn?'Âm thanh':'Không gian âm thanh'}</button>
   </header>

   <section className={styles.prologue}>
     <div className={styles.prologueHalo} aria-hidden="true"><span/><span/><span/></div>
     <div className={styles.prologueCopy}>
       <span className={styles.eyebrow}>Một hành trình xuyên qua lịch sử đức tin</span>
       <h1>Từ Chúa Giêsu<br/><em>đến Nixêa</em></h1>
       <p>Không phải một bài học để đọc hết. Đây là một tuyến đường để bước qua — nơi con người, địa danh, biến cố và tư tưởng dần hiện ra như một bản đồ sống.</p>
       <button className={styles.startButton} onClick={()=>jump(0)}>Bắt đầu hành trình <span>↓</span></button>
     </div>
     <div className={styles.prologueIndex}><span>30</span><i/><b>295 năm</b><i/><span>325</span></div>
   </section>

   <div className={styles.journey}>
     <nav className={styles.chapterRail} aria-label="Các chặng của hành trình">
       <div className={styles.railTrack}><i style={{height:`${(active/(chapters.length-1))*100}%`}}/></div>
       {chapters.map((chapter,index)=><button key={chapter.id} onClick={()=>jump(index)} className={index===active?styles.railActive:''} aria-label={`Đi đến ${chapter.title}`}><span>{String(index+1).padStart(2,'0')}</span><i/><small>{chapter.year}</small></button>)}
     </nav>

     <div className={styles.scenes}>{chapters.map((chapter,index)=>
       <section id={chapter.id} ref={el=>{sceneRefs.current[index]=el}} data-index={index} key={chapter.id} className={`${styles.scene} ${index===active?styles.sceneActive:''} ${index%2?styles.sceneReverse:''}`}>
         <div className={styles.artwork}>
           <EditorialArtwork assetId={chapter.asset} height={980} radius={0} showCredit={false}/>
           <div className={styles.artworkVeil}/>
           <span className={styles.artworkNumber}>{String(index+1).padStart(2,'0')}</span>
         </div>

         <article className={styles.storyPanel}>
           <div className={styles.chapterMeta}><span>{chapter.kicker}</span><i/><b>{chapter.year}</b></div>
           <h2>{chapter.title}</h2>
           <p>{chapter.body}</p>
           <div className={styles.entityLine}>{chapter.nodes.map(node=><span key={node}><i/>{node}</span>)}</div>
           <div className={styles.storyActions}>
             <Link href={toExploreHref({journeyId:'jesus-to-nicaea',chapterId:chapter.id,chapterLabel:chapter.title})}>Mở bản đồ của chặng này <span>↗</span></Link>
             {index===chapters.length-1&&<Link className={styles.secondaryAction} href="/cong-dong/nixea">Đi sâu vào Nixêa</Link>}
           </div>
         </article>

         <div className={styles.sceneMarker} aria-hidden="true"><span>{chapter.year}</span><i/></div>
       </section>)}
     </div>
   </div>

   <section className={styles.epilogue}>
     <div className={styles.epilogueConstellation} aria-hidden="true"><i/><i/><i/><i/><i/><i/><span/></div>
     <div className={styles.epilogueCopy}>
       <span className={styles.eyebrow}>325 không phải là điểm kết thúc</span>
       <h2>Mỗi điểm sáng<br/>mở ra một thế giới.</h2>
       <p>Nixêa nối tới các Giáo phụ, các công đồng, giáo lý về Đức Kitô, phụng vụ và nhiều thế kỷ lịch sử phía trước. Hành trình này chỉ là một đường đi xuyên qua bản đồ tri thức.</p>
       <div className={styles.finalActions}><Link href="/cong-dong/nixea">Khám phá Nixêa →</Link><Link href="/kham-pha">Mở bản đồ tri thức ↗</Link></div>
     </div>
   </section>
 </main>
}

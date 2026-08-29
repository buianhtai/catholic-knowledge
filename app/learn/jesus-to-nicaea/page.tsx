'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditorialArtwork from '@/components/media/EditorialArtwork';
import styles from './journey.module.css';

const chapters = [
  {year:'k. 30',kicker:'Khởi nguyên',title:'Chúa Giêsu và các Tông đồ',body:'Từ Galilê đến Giêrusalem, lời rao giảng Nước Thiên Chúa quy tụ một cộng đoàn môn đệ. Từ đây, một câu chuyện sẽ lan vượt khỏi biên giới của một vùng đất.',asset:'art.gutenberg-bible',nodes:['Galilê','Nhóm Mười Hai','Giêrusalem','Tin Mừng']},
  {year:'k. 30',kicker:'Ngọn lửa',title:'Lễ Ngũ Tuần',body:'Các môn đệ bước ra khỏi căn phòng đóng kín. Việc loan báo Tin Mừng trở thành một sứ mạng công khai và cộng đoàn Giáo Hội bắt đầu mở rộng.',asset:'art.mass-at-bolsena',nodes:['Chúa Thánh Thần','Phêrô','Phép Rửa','Công vụ']},
  {year:'30–60',kicker:'Những con đường',title:'Phêrô, Phaolô và sứ mạng',body:'Từ Giêrusalem, Antiôkia đến Rôma, những con đường của Địa Trung Hải trở thành mạng lưới truyền giáo. Những cộng đoàn mới đặt ra những câu hỏi mới về đức tin và đời sống.',asset:'art.gutenberg-bible',nodes:['Phêrô','Phaolô','Antiôkia','Rôma']},
  {year:'64–303',kicker:'Chứng tá',title:'Bách hại và tăng trưởng',body:'Đức tin không lớn lên trong an toàn. Chứng tá của các vị tử đạo, các nhà hộ giáo và những Giáo hội địa phương làm cho căn tính Kitô giáo ngày càng rõ nét.',asset:'art.nicaea-icon',nodes:['Các vị tử đạo','Hộ giáo','Rôma','Giáo hội địa phương']},
  {year:'313',kicker:'Bước ngoặt',title:'Constantinô và một thế giới đổi thay',body:'Khi Kitô hữu có thể sống đức tin công khai hơn, Giáo Hội bước vào một không gian lịch sử mới. Những tranh luận thần học giờ đây có thể quy tụ các giám mục từ nhiều miền.',asset:'art.nicaea-icon',nodes:['Constantinô','Milan','Giám mục','Đế quốc']},
  {year:'325',kicker:'Hội tụ',title:'Công đồng Nixêa',body:'Tại Nixêa, các giám mục đối diện một câu hỏi quyết định về căn tính của Đức Kitô. Kinh Tin Kính trở thành một điểm sáng kết nối các cộng đoàn trong cùng một lời tuyên xưng.',asset:'art.nicaea-icon',nodes:['Nixêa','Ariô','Athanasiô','Kinh Tin Kính']},
] as const;

export default function JesusToNicaeaPage(){
 const [active,setActive]=useState(0);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='ArrowRight')setActive(v=>Math.min(chapters.length-1,v+1));if(e.key==='ArrowLeft')setActive(v=>Math.max(0,v-1));};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);
 const chapter=chapters[active];
 return <main className={styles.page}>
   <div className={styles.stars} aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
   <header className={styles.top}><Link href="/">☩ <span>Catholic Knowledge</span></Link><div><span>Hành trình 01</span><b>{String(active+1).padStart(2,'0')} / {String(chapters.length).padStart(2,'0')}</b></div></header>
   <section className={styles.stage}>
     <div className={styles.intro}>
       <span className={styles.eyebrow}>Một hành trình xuyên qua lịch sử đức tin</span>
       <h1>Từ Chúa Giêsu<br/><em>đến Nixêa</em></h1>
       <p>Không đọc lịch sử như một danh sách ngày tháng. Hãy đi xuyên qua những con người, địa danh và ý tưởng đã kết nối để hình thành Giáo Hội sơ khai.</p>
       <div className={styles.hint}>Cuộn, chạm hoặc dùng phím ← → để du hành</div>
     </div>
     <div className={styles.galaxy} aria-label="Bản đồ hành trình">
       <div className={styles.orbitA}/><div className={styles.orbitB}/><div className={styles.glow}/>
       {chapters.map((item,index)=>{const angle=(index/chapters.length)*Math.PI*2-Math.PI/2;const x=50+Math.cos(angle)*39;const y=50+Math.sin(angle)*39;return <button key={item.title} onClick={()=>setActive(index)} className={`${styles.starNode} ${active===index?styles.activeNode:''}`} style={{left:`${x}%`,top:`${y}%`}}><span>{index+1}</span><small>{item.year}</small></button>})}
       <div className={styles.core}><span>{chapter.year}</span><strong>{chapter.kicker}</strong><small>{active===5?'NIXÊA':'ĐANG DU HÀNH'}</small></div>
     </div>
   </section>

   <section className={styles.chapter} key={chapter.title}>
     <div className={styles.art}><EditorialArtwork assetId={chapter.asset} height={560} radius={0} showCredit={false}/><div className={styles.artShade}/><div className={styles.artLabel}><span>{chapter.year}</span><small>Chặng {active+1} · {chapter.kicker}</small></div></div>
     <article className={styles.story}>
       <div className={styles.chapterNumber}>0{active+1}</div>
       <span className={styles.eyebrow}>{chapter.kicker} · {chapter.year}</span>
       <h2>{chapter.title}</h2><p>{chapter.body}</p>
       <div className={styles.constellation}>{chapter.nodes.map((node,index)=><span key={node} style={{animationDelay:`${index*120}ms`}}><i/> {node}</span>)}</div>
       <div className={styles.controls}><button disabled={active===0} onClick={()=>setActive(v=>Math.max(0,v-1))}>← Chặng trước</button><div className={styles.progress}>{chapters.map((_,i)=><button aria-label={`Đi đến chặng ${i+1}`} key={i} onClick={()=>setActive(i)} className={i<=active?styles.done:''}/>)}</div><button disabled={active===chapters.length-1} onClick={()=>setActive(v=>Math.min(chapters.length-1,v+1))}>Chặng tiếp →</button></div>
       {active===chapters.length-1&&<Link className={styles.enter} href="/cong-dong/nixea">Bước vào Công đồng Nixêa →</Link>}
     </article>
   </section>

   <section className={styles.epilogue}><span>Không có điểm nào đứng một mình.</span><h2>Mỗi ánh sáng mở ra<br/>một thế giới khác.</h2><p>Con người dẫn đến địa danh. Địa danh dẫn đến biến cố. Biến cố dẫn đến giáo lý, tác phẩm và những câu chuyện tiếp theo.</p><Link href="/kham-pha">Mở bản đồ tri thức →</Link></section>
 </main>
}

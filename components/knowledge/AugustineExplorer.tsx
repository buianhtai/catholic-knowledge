'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import EditorialArtwork from '@/components/media/EditorialArtwork';
import { entities, relationships, sources } from '@/data/augustine';
import SourceBadge from '@/components/source/SourceBadge';
import { MilestoneRibbon, RelationshipOrbit } from '@/components/visual/Infographics';
import { text } from '@/lib/knowledge/types';
import styles from './AugustineExplorer.module.css';

type Tab = 'Tổng quan' | 'Dòng đời' | 'Kết nối' | 'Tác phẩm' | 'Nguồn';
const timeline = [['354','Sinh tại Tagaste, Bắc Phi thuộc Rôma.'],['383','Rời Carthage đến Rôma và sau đó tới Milan.'],['387','Được Thánh Ambrôsiô làm phép Rửa tại Milan.'],['391','Được truyền chức linh mục tại Hippo.'],['395','Trở thành giám mục Hippo.'],['397','Bắt đầu viết Tự thuật (Confessions).'],['430','Qua đời trong thời Hippo bị vây hãm.']];
const typeLabel: Record<string,string>={person:'Nhân vật',place:'Địa danh',work:'Tác phẩm',concept:'Khái niệm',event:'Biến cố',organization:'Tổ chức'};

export default function AugustineExplorer(){
 const [tab,setTab]=useState<Tab>('Tổng quan');
 const augustine=entities.find(e=>e.id==='person.augustine-of-hippo');
 const connected=useMemo(()=>relationships.map(edge=>{const otherId=edge.from===augustine?.id?edge.to:edge.from;return{edge,entity:entities.find(item=>item.id===otherId)}}).filter(i=>i.entity),[augustine?.id]);
 const writings=connected.filter(i=>i.entity?.type==='work');
 if(!augustine)return null;
 return <main className={styles.page}>
  <section className={`container ${styles.hero}`}>
   <div className={styles.portraitPanel}><EditorialArtwork assetId="art.augustine-philippe-de-champaigne" height="100%" radius={22} objectPosition="center 20%"/><div className={styles.portraitMeta}><span>Thánh · Giám mục · Nhà thần học</span><span>354–430</span></div></div>
   <div className={styles.identity}><div className="eyebrow">Thánh · Tiến sĩ Hội Thánh</div><h1>Thánh Augustinô thành Hippo</h1><p>Một trong những nhà tư tưởng có ảnh hưởng sâu rộng nhất của Kitô giáo Tây phương, với hành trình hoán cải, đời sống mục tử và những trước tác định hình nhiều thế kỷ suy tư thần học.</p><div className={styles.roles}><span>Tiến sĩ Hội Thánh</span><span>Giám mục Hippo</span><span>Bắc Phi</span><span>Hậu cổ đại</span></div><div className={styles.metrics}><div><strong>76</strong><span>năm cuộc đời</span></div><div><strong>{relationships.length}</strong><span>mối liên hệ</span></div><div><strong>{writings.length}</strong><span>tác phẩm nổi bật</span></div><div><strong>28/08</strong><span>lễ kính</span></div></div><div className={styles.actions}><Link href="/kham-pha">Mở bản đồ tri thức →</Link><Link href="/lich-su-giao-hoi">Đặt vào lịch sử Giáo Hội →</Link></div></div>
  </section>

  <nav className={`container ${styles.tabs}`}>{(['Tổng quan','Dòng đời','Kết nối','Tác phẩm','Nguồn'] as Tab[]).map(name=><button key={name} className={tab===name?styles.active:''} onClick={()=>setTab(name)}>{name}</button>)}</nav>

  <section className={`container ${styles.body}`}>
   {tab==='Tổng quan'&&<><article className={styles.storyPanel}><div className="eyebrow">Tiểu sử trực quan</div><h2>Một trái tim khắc khoải trở thành hành trình hoán cải.</h2><p>Cuộc đời Augustinô đi qua gia đình, triết học, di chuyển, tình bạn, sứ vụ giám mục và trước tác. Mỗi bước ngoặt có thể được khám phá như một phần của mạng lưới tri thức thay vì bị chôn trong một bài viết dài.</p><MilestoneRibbon items={[{year:'354',title:'Tagaste',detail:'sinh ra và gia đình'},{year:'383',title:'Milan',detail:'bước ngoặt trí thức'},{year:'387',title:'Phép Rửa',detail:'Ambrôsiô và hoán cải'},{year:'395',title:'Hippo',detail:'giám mục và mục tử'},{year:'397+',title:'Trước tác',detail:'Tự thuật và thần học'}]}/></article><aside className={styles.legacy}><EditorialArtwork assetId="art.augustine-philippe-de-champaigne" height={220} radius={12} objectPosition="center 18%"/><div className="eyebrow" style={{marginTop:14}}>Bản đồ ảnh hưởng</div><h3>Vì sao Augustinô quan trọng?</h3><RelationshipOrbit center="Augustinô" items={[{label:'Monica',detail:'thân mẫu'},{label:'Ambrôsiô',detail:'người làm phép Rửa'},{label:'Phaolô',detail:'ảnh hưởng Kinh Thánh'},{label:'Tự thuật',detail:'tác phẩm'},{label:'Ân sủng',detail:'thần học'},{label:'Tây phương trung cổ',detail:'di sản'}]}/></aside></>}
   {tab==='Dòng đời'&&<article className={styles.fullPanel}><div className="eyebrow">Dòng đời</div><h2>Bảy bước ngoặt</h2><MilestoneRibbon items={timeline.map(([year,detail])=>({year,title:detail.split('.')[0],detail}))}/></article>}
   {tab==='Kết nối'&&<article className={styles.fullPanel}><div className="eyebrow">Đồ thị tri thức</div><h2>Con người, địa danh, tác phẩm và tư tưởng</h2><RelationshipOrbit center="Augustinô" items={connected.slice(0,6).map(({edge,entity})=>({label:entity?text(entity.labels):edge.type,detail:edge.type.replaceAll('_',' ').toLowerCase()}))}/><div className={styles.relationList}>{connected.map(({edge,entity})=>entity&&<div key={edge.id}><span className={styles.icon} style={{fontSize:10,fontWeight:800,minWidth:62}}>{typeLabel[entity.type]}</span><p><strong>{text(entity.labels)}</strong><small>{entity.subtype}</small></p><em>{edge.type.replaceAll('_',' ')}</em></div>)}</div></article>}
   {tab==='Tác phẩm'&&<article className={styles.fullPanel}><div className="eyebrow">Tác phẩm nổi bật</div><h2>Các tác phẩm trong đồ thị</h2><div className={styles.books}>{writings.map(({entity})=>entity&&<div key={entity.id}><EditorialArtwork assetId="art.gutenberg-bible" height={150} radius={10} showCredit={false}/><h3>{text(entity.labels)}</h3><p>{entity.subtype}</p><b>Mở tác phẩm →</b></div>)}</div></article>}
   {tab==='Nguồn'&&<article className={styles.fullPanel}><div className="eyebrow">Nguồn gốc dữ liệu</div><h2>Bằng chứng phía sau hồ sơ</h2><p>Các thực thể và mối quan hệ chuẩn tham chiếu đến nguồn đã biết; phần giải thích được tạo ra luôn tách biệt khỏi bằng chứng. Hình ảnh biên tập có nguồn riêng và không được xem là bằng chứng lịch sử.</p><div style={{display:'flex',gap:10,flexWrap:'wrap',margin:'18px 0 24px'}}>{sources.map(source=><SourceBadge key={source.id} source={source}/>)}</div>{sources.map(source=><div className={styles.source} key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><span>{source.publisher} · {source.sourceType} {source.license?`· ${source.license}`:''}</span></div>)}</article>}
  </section>
 </main>
}

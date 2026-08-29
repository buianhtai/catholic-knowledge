'use client';

import Link from 'next/link';
import EditorialArtwork from '@/components/media/EditorialArtwork';
import { RelationshipOrbit } from '@/components/visual/Infographics';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import styles from './home.module.css';

const viCategories = [
  ['art.gutenberg-bible','Kinh Thánh','Khám phá các sách, nhân vật, địa danh và chủ đề','/kinh-thanh'],
  ['art.augustine-philippe-de-champaigne','Các Thánh','Cuộc đời, chứng tá và linh đạo','/cac-thanh/augustino-thanh-hippo'],
  ['art.nicaea-icon','Lịch sử Giáo Hội','Các biến cố, công đồng và những bước ngoặt lớn','/lich-su-giao-hoi'],
  ['art.rublev-trinity','Giáo lý','Các mầu nhiệm đức tin và mối liên hệ thần học','/giao-ly'],
  ['art.mass-at-bolsena','Phụng vụ','Thánh lễ, các bí tích và đời sống cầu nguyện','/phung-vu'],
  ['place.la-vang-shrine','Công giáo Việt Nam','La Vang, các Thánh Tử đạo Việt Nam và lịch sử Giáo Hội tại Việt Nam','/dia-diem'],
] as const;

const enCategories = [
  ['art.gutenberg-bible','Scripture','Books, people, places and themes','/scripture'],
  ['art.augustine-philippe-de-champaigne','Saints','Lives, witness and spirituality','/saints/augustine-of-hippo'],
  ['art.nicaea-icon','Church History','Events, councils and major turning points','/timeline'],
  ['art.rublev-trinity','Doctrine','Mysteries of faith and theological connections','/doctrine'],
  ['art.mass-at-bolsena','Liturgy','Mass, sacraments and prayer','/liturgy'],
  ['place.la-vang-shrine','Catholic Vietnam','La Vang, martyrs and local Church history','/places'],
] as const;

export default function HomePage() {
  const { locale } = useLocale();
  const vi = locale === 'vi';
  const categories = vi ? viCategories : enCategories;
  const href = (viHref:string,enHref:string) => vi ? viHref : enHref;

  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className="eyebrow">{vi?'Bách khoa trực quan về đức tin Công giáo':'A visual encyclopedia of the Catholic faith'}</span>
        <h1>{vi?'Khám phá đức tin như một thế giới được kết nối.':'Explore the faith as a connected world.'}</h1>
        <p>{vi?'Con người, Kinh Thánh, lịch sử, giáo lý, phụng vụ và các địa danh được kết nối bằng những nguồn tư liệu rõ ràng — để bạn không chỉ đọc từng câu chuyện riêng lẻ mà còn thấy được bức tranh toàn cảnh.':'People, Scripture, history, doctrine, liturgy and places connected through clear sources so you can see the bigger picture, not just read isolated pages.'}</p>
        <form className={styles.search} action={href('/kham-pha','/explore')}>
          <input name="q" aria-label={vi?'Tìm kiếm Catholic Knowledge':'Search Catholic Knowledge'} placeholder={vi?'Bạn muốn tìm hiểu điều gì?':'What do you want to explore?'}/>
          <button>{vi?'Tìm kiếm':'Search'}</button>
        </form>
        <div className={styles.quickLinks}>
          <Link href={href('/cac-thanh/augustino-thanh-hippo','/saints/augustine-of-hippo')}>{vi?'Thánh Augustinô':'St. Augustine'}</Link>
          <Link href={href('/cong-dong/nixea','/councils/nicaea')}>{vi?'Công đồng Nixêa':'Council of Nicaea'}</Link>
          <Link href={href('/giao-ly','/doctrine')}>{vi?'Chúa Ba Ngôi':'The Trinity'}</Link>
          <Link href={href('/dia-diem','/places')}>{vi?'Đức Mẹ La Vang':'Our Lady of La Vang'}</Link>
        </div>
      </div>

      <div className={styles.heroVisual}>
        <EditorialArtwork assetId="art.augustine-philippe-de-champaigne" height={560} radius={26} objectPosition="center 20%"/>
        <div className={styles.quoteCard}>
          <blockquote>{vi?'“Lòng chúng con khắc khoải cho đến khi được nghỉ yên trong Chúa.”':'“Our hearts are restless until they rest in You.”'}</blockquote>
          <span>— {vi?'Thánh Augustinô':'St. Augustine'}</span>
          <Link href={href('/cac-thanh/augustino-thanh-hippo','/saints/augustine-of-hippo')}>{vi?'Khám phá cuộc đời ngài →':'Explore his story →'}</Link>
        </div>
      </div>
    </section>

    <section className={styles.todayStrip}>
      <div><span className="eyebrow">{vi?'Hôm nay trong Giáo Hội':'Today in the Church'}</span><strong>{vi?'29 tháng 8 · Thánh Gioan Tẩy Giả bị trảm quyết':'29 August · Saint John the Baptist'}</strong><p>{vi?'Xem ngày phụng vụ hôm nay để đọc các bài đọc, tìm hiểu vị thánh được kính nhớ, mùa phụng vụ và những mối liên hệ trong bản đồ tri thức.':'Open the liturgical day to see readings, saint, season and related knowledge.'}</p></div>
      <Link className="btn btn-primary" href={href('/phung-vu','/liturgy')}>{vi?'Xem phụng vụ hôm nay →':'View today’s liturgy →'}</Link>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><span className="eyebrow">{vi?'Bắt đầu từ đâu':'Where to begin'}</span><h2>{vi?'Khám phá theo chủ đề':'Explore by topic'}</h2></div><Link href={href('/kham-pha','/explore')}>{vi?'Mở bản đồ tri thức →':'Open knowledge map →'}</Link></div>
      <div className={styles.categoryGrid}>{categories.map(([asset,title,body,route])=><Link href={route} className={styles.category} key={title}><EditorialArtwork assetId={asset} height={190} radius={18} showCredit={false}/><div><h3>{title}</h3><p>{body}</p><span>{vi?'Khám phá →':'Explore →'}</span></div></Link>)}</div>
    </section>

    <section className={styles.storyGrid}>
      <article className={styles.featureStory}>
        <div className={styles.storyImage}><EditorialArtwork assetId="place.la-vang-shrine" height={360} radius={22}/></div>
        <div><span className="eyebrow">{vi?'Góc nhìn Việt Nam':'Vietnam lens'}</span><h2>{vi?'Đức Mẹ La Vang: một địa danh, nhiều lớp ký ức.':'Our Lady of La Vang: one place, many layers of memory.'}</h2><p>{vi?'Từ một trung tâm hành hương, bạn có thể lần theo lịch sử Công giáo Việt Nam, lòng tôn kính Đức Mẹ, đời sống của Giáo Hội địa phương và những nhân vật liên quan.':'From one pilgrimage site, move into Vietnamese Catholic history, Marian devotion, local Church life and related people.'}</p><Link className="btn btn-secondary" href={href('/dia-diem','/places')}>{vi?'Khám phá La Vang →':'Explore La Vang →'}</Link></div>
      </article>

      <aside className={styles.graphCard}>
        <span className="eyebrow">{vi?'Tri thức được kết nối':'Connected knowledge'}</span>
        <h2>{vi?'Một nhân vật có thể mở ra cả một mạng lưới tri thức.':'One person opens an entire network.'}</h2>
        <RelationshipOrbit center={vi?'Augustinô':'Augustine'} items={[{label:'Monica',detail:vi?'thân mẫu':'mother'},{label:'Ambrôsiô',detail:vi?'giám mục':'bishop'},{label:'Hippo',detail:vi?'địa danh':'place'},{label:vi?'Tự Thuật':'Confessions',detail:vi?'tác phẩm':'work'},{label:vi?'Ân sủng':'Grace',detail:vi?'giáo lý':'doctrine'}]}/>
        <Link href={href('/kham-pha','/explore')}>{vi?'Xem bản đồ đầy đủ →':'View full map →'}</Link>
      </aside>
    </section>

    <section className={styles.journey}>
      <div><span className="eyebrow">{vi?'Hành trình học hỏi':'Learning journey'}</span><h2>{vi?'Từ Chúa Giêsu đến Công đồng Nixêa':'From Jesus to the Council of Nicaea'}</h2><p>{vi?'Sáu chặng kết nối Chúa Giêsu, các Tông đồ, Lễ Ngũ Tuần, sứ vụ truyền giáo, thời kỳ bách hại, Hoàng đế Constantinô và Công đồng Nixêa.':'Six milestones connect Jesus, the apostles, Pentecost, mission, persecution, Constantine and Nicaea.'}</p><Link className="btn btn-primary" href={href('/hanh-trinh/tu-chua-giesu-den-nixea','/learn/jesus-to-nicaea')}>{vi?'Bắt đầu hành trình →':'Start the journey →'}</Link></div>
      <EditorialArtwork assetId="art.nicaea-icon" height={310} radius={22}/>
    </section>
  </main>;
}

'use client';

import { entities } from '@/data/augustine';
import { text } from '@/lib/knowledge/types';
import styles from './KnowledgeGraph.module.css';

type Props = {
  selectedId: string;
  onFocus: (id: string) => void;
};

type Moment = {
  year: string;
  label: string;
  detail: string;
  entityId?: string;
  placeId?: string;
};

const moments: Moment[] = [
  { year: '354', label: 'Sinh tại Tagaste', detail: 'Augustinô chào đời tại Bắc Phi.', entityId: 'person.augustine-of-hippo', placeId: 'place.tagaste' },
  { year: '383', label: 'Đến Rôma', detail: 'Một bước ngoặt trên hành trình trí thức và đức tin.' },
  { year: '384', label: 'Milan', detail: 'Gặp ảnh hưởng của Thánh Ambrôsiô.', entityId: 'person.ambrose-of-milan' },
  { year: '387', label: 'Lãnh Bí tích Rửa tội', detail: 'Được Thánh Ambrôsiô rửa tội tại Milan.', entityId: 'person.augustine-of-hippo' },
  { year: '397', label: 'Tự Thuật', detail: 'Tác phẩm nối ký ức cá nhân với thần học.', entityId: 'work.confessions' },
  { year: '395', label: 'Giám mục Hippo', detail: 'Phục vụ Hội Thánh tại Hippo Regius.', entityId: 'place.hippo-regius', placeId: 'place.hippo-regius' },
  { year: '430', label: 'Qua đời tại Hippo', detail: 'Khép lại cuộc đời nhưng mở rộng ảnh hưởng lâu dài.', entityId: 'person.augustine-of-hippo', placeId: 'place.hippo-regius' },
];

const places = [
  { id: 'place.tagaste', label: 'Tagaste', x: 17, y: 63, note: 'Nơi sinh' },
  { id: 'place.carthage', label: 'Carthage', x: 30, y: 69, note: 'Học tập & giảng dạy' },
  { id: 'place.rome', label: 'Rôma', x: 56, y: 39, note: '383' },
  { id: 'place.milan', label: 'Milan', x: 63, y: 23, note: 'Ambrôsiô · 384–387', entityId: 'person.ambrose-of-milan' },
  { id: 'place.hippo-regius', label: 'Hippo', x: 36, y: 58, note: 'Giám mục · 395–430' },
];

const selectedEntity = (id: string) => entities.find((entity) => entity.id === id);

export default function AugustineContextSync({ selectedId, onFocus }: Props) {
  const activeMoments = moments.filter((moment) => moment.entityId === selectedId || moment.placeId === selectedId);
  const current = selectedEntity(selectedId);

  return (
    <section className={styles.contextSync} aria-label="Dòng thời gian và địa lý đồng bộ">
      <div className={styles.contextHeader}>
        <div>
          <span>Same focus · different lenses</span>
          <h2>{current ? text(current.labels) : 'Augustinô'} trong thời gian và không gian</h2>
        </div>
        <p>Canvas, dòng thời gian và địa lý dùng cùng một trạng thái lựa chọn. Chọn một mốc hoặc địa danh để quay lại đúng thực thể trên graph.</p>
      </div>

      <div className={styles.contextGrid}>
        <div className={styles.timelinePanel}>
          <div className={styles.panelLabel}>Dòng thời gian</div>
          <div className={styles.timelineTrack}>
            {moments.map((moment) => {
              const active = moment.entityId === selectedId || moment.placeId === selectedId;
              return (
                <button
                  key={`${moment.year}-${moment.label}`}
                  className={`${styles.timelineMoment} ${active ? styles.timelineMomentActive : ''}`}
                  onClick={() => moment.entityId && onFocus(moment.entityId)}
                  disabled={!moment.entityId}
                  title={moment.detail}
                >
                  <span>{moment.year}</span>
                  <i />
                  <strong>{moment.label}</strong>
                  <small>{moment.detail}</small>
                </button>
              );
            })}
          </div>
          {activeMoments.length > 0 && (
            <div className={styles.contextReceipt}>
              <b>Đang đồng bộ</b>
              <span>{activeMoments.map((moment) => `${moment.year} · ${moment.label}`).join('  ·  ')}</span>
            </div>
          )}
        </div>

        <div className={styles.mapPanel}>
          <div className={styles.panelLabel}>Địa lý hành trình</div>
          <div className={styles.mapCanvas}>
            <svg viewBox="0 0 100 80" aria-hidden="true">
              <path d="M8 55 C22 40, 36 45, 47 34 S70 18, 86 24" />
              <path d="M13 66 C28 60, 34 58, 47 48" />
              <line x1="17" y1="63" x2="30" y2="69" />
              <line x1="30" y1="69" x2="56" y2="39" />
              <line x1="56" y1="39" x2="63" y2="23" />
              <line x1="63" y1="23" x2="36" y2="58" />
            </svg>
            {places.map((place) => {
              const target = place.entityId ?? place.id;
              const active = selectedId === target || selectedId === place.id;
              const canFocus = Boolean(selectedEntity(target));
              return (
                <button
                  key={place.id}
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  className={`${styles.mapPoint} ${active ? styles.mapPointActive : ''}`}
                  onClick={() => canFocus && onFocus(target)}
                  disabled={!canFocus}
                >
                  <i />
                  <strong>{place.label}</strong>
                  <small>{place.note}</small>
                </button>
              );
            })}
          </div>
          <p className={styles.mapNote}>Bản đồ này là sơ đồ hành trình định hướng, không phải bản đồ địa lý theo tỷ lệ.</p>
        </div>
      </div>
    </section>
  );
}

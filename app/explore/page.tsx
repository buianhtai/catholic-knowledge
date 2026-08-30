import KnowledgeGraphExplorer from '@/components/graph/KnowledgeGraphExplorer';
import responsive from '@/components/graph/KnowledgeGraphResponsive.module.css';

export default function ExplorePage() {
  return (
    <div className={responsive.page}>
      <KnowledgeGraphExplorer />
    </div>
  );
}

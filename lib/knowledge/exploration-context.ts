export type ExplorationContext = {
  focusEntityId?: string;
  journeyId?: string;
  chapterId?: string;
  chapterLabel?: string;
};

export function toExploreHref(context: ExplorationContext) {
  const params = new URLSearchParams();
  if (context.focusEntityId) params.set('focus', context.focusEntityId);
  if (context.journeyId) params.set('journey', context.journeyId);
  if (context.chapterId) params.set('chapter', context.chapterId);
  if (context.chapterLabel) params.set('chapterLabel', context.chapterLabel);
  return `/kham-pha?${params.toString()}`;
}

export function toJourneyHref(context: ExplorationContext) {
  if (context.journeyId === 'jesus-to-nicaea') {
    const chapter = context.chapterId ? `#${context.chapterId}` : '';
    return `/hanh-trinh/tu-chua-giesu-den-nixea${chapter}`;
  }
  return '/';
}

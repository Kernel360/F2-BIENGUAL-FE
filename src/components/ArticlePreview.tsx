import Link from 'next/link';

import { formatDate } from '@/lib/formatDate';

interface ArticelPreviewData {
  scrapId?: number;
  contentId: number;
  title: string;
  category?: string;
  thumbnailUrl: string;
  preScripts: string;
  hits?: number;
  createdAt?: string;
}

export default function ArticlePreview({
  // TODO(@smosco): hits, 북마크 아이콘 추가
  data: {
    contentId,
    thumbnailUrl,
    title,
    category,
    preScripts,
    hits,
    createdAt,
  },
}: {
  data: ArticelPreviewData;
}) {
  return (
    <Link href={`/learn/reading/detail/${contentId}`}>
      <div className="pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-semibold mb-2 hover:underline underline-offset-2">
              {title}
            </h2>
            {category && <p className="text-sm mb-3">{category}</p>}
            <p className="text-sm mb-3">
              {createdAt && `${formatDate(createdAt)} 저장`}
            </p>
            {hits && (
              <p className="text-sm text-muted-foreground mb-3">{hits}회</p>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {preScripts}
            </p>
          </div>
          {thumbnailUrl && (
            <div className="flex-shrink-0 w-24">
              <img
                src={thumbnailUrl}
                alt="scrapThumbnail"
                className="rounded-md object-cover aspect-square"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

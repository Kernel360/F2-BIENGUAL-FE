import Link from 'next/link';

import { BookOpen, Headphones, Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatFullDateWithPad } from '@/lib/formatDate';

interface ContentPreviewData {
  scrapId?: number;
  contentId: number;
  title: string;
  category?: string;
  thumbnailUrl: string;
  preScripts: string;
  hits?: number;
  createdAt?: string;
  contentType: 'READING' | 'LISTENING';
}

export default function ContentPreview({
  data: {
    contentId,
    thumbnailUrl,
    title,
    category,
    preScripts,
    hits,
    createdAt,
    contentType,
  },
}: {
  data: ContentPreviewData;
}) {
  const isReading = contentType === 'READING';
  const Icon = isReading ? BookOpen : Headphones;
  const accentColor = isReading ? 'bg-green-300' : 'bg-indigo-200';
  const linkHref = isReading
    ? `/learn/reading/detail/${contentId}`
    : `/learn/listening/detail/${contentId}`;

  return (
    <Link href={linkHref}>
      <Card className="mb-4 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 flex-shrink-0">
              <div className="aspect-video md:aspect-square w-full">
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="rounded-sm object-cover h-full"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-start justify-between mb-2">
                <Badge
                  variant="secondary"
                  className={`${accentColor} text-gray-800`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {contentType}
                </Badge>
                {createdAt && (
                  <span className="text-sm text-muted-foreground">
                    {formatFullDateWithPad(createdAt)} 저장
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold mb-2 hover:underline underline-offset-2">
                {title}
              </h2>
              {category && <p className="text-sm mb-2">{category}</p>}
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {preScripts}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-2 flex justify-between items-center ">
          <div className="flex items-center">
            {hits !== undefined && (
              <span className="flex items-center mr-4">
                <Eye className="w-4 h-4 mr-1" />
                {hits}회
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

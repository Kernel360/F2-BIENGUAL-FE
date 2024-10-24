import Link, { LinkProps } from 'next/link';

import { Badge } from '@/components/ui/badge';

interface ListItemProps extends Pick<LinkProps, 'href'> {
  coverImageUrl: string;
  category: string;
  title: string;
  description: string;
  footerContent?: React.ReactNode;
}

export default function ListItem({
  // TODO(@smosco): hits, 북마크 아이콘 추가
  href,
  coverImageUrl,
  category,
  title,
  description,
  footerContent,
}: ListItemProps) {
  return (
    <Link href={href}>
      <div className="pb-6 border-b border-gray-200 flex justify-between items-start">
        <div className="flex-1 pr-4">
          <Badge>{category}</Badge>

          <h2 className="mt-1 text-lg font-semibold mb-2 hover:underline underline-offset-2">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {footerContent && footerContent}
        </div>

        <div className="flex-shrink-0 w-32">
          <img
            src={coverImageUrl}
            alt="scrapThumbnail"
            className="rounded-md object-cover aspect-square"
          />
        </div>
      </div>
    </Link>
  );
}

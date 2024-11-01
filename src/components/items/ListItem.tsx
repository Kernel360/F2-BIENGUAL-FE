import Link, { LinkProps } from 'next/link';

interface ListItemProps extends Pick<LinkProps, 'href'> {
  coverImageUrl: string;
  topRightButton?: React.ReactNode;
  leftBadge?: React.ReactNode;
  rightBadge?: React.ReactNode;
  title: string;
  description: string;
  footerContent?: React.ReactNode;
}

export default function ListItem({
  href,
  coverImageUrl,
  topRightButton,
  leftBadge,
  rightBadge,
  title,
  description,
  footerContent,
}: ListItemProps) {
  return (
    <Link href={href}>
      <div className="pb-6 border-b border-gray-200 flex justify-between items-start">
        <div className="flex-1 pr-4">
          <div className="flex justify-between">
            {leftBadge}
            {rightBadge}
          </div>

          <h2 className="mt-1 text-lg font-semibold mb-2 hover:underline underline-offset-2">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {footerContent && footerContent}
        </div>

        <div className="relative flex-shrink-0 w-32">
          <img
            src={coverImageUrl}
            alt="scrapThumbnail"
            className="rounded-md object-cover aspect-square"
          />
          <div className="absolute top-3 right-3 z-10">{topRightButton}</div>
        </div>
      </div>
    </Link>
  );
}

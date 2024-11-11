import React from 'react';

import Link, { LinkProps } from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

interface ContentCardProps extends Pick<LinkProps, 'href'> {
  bottomRightButton?: React.ReactNode;
  topRightButton?: React.ReactNode;
  leftBadge?: React.ReactNode;
  rightBadge?: React.ReactNode;
  footerContent?: React.ReactNode;
  coverImageUrl: string;
  title: string;
  description: string;
}

export default function ContentCard({
  href,
  bottomRightButton,
  topRightButton,
  leftBadge,
  rightBadge,
  footerContent,
  coverImageUrl,
  title,
  description,
}: ContentCardProps) {
  return (
    <Link href={href} className="block w-full h-full">
      <Card className="overflow-hidden shadow-card hover:shadow-card-hover hover:border-border h-full">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-40 overflow-hidden">
            <div className="absolute top-3 right-3 z-20">{topRightButton}</div>
            <img
              src={coverImageUrl}
              alt={title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-3 right-3 z-20">
              {bottomRightButton}
            </div>
          </div>
          <div className="p-4 space-y-2 flex-1">
            <div className="flex justify-between">
              {leftBadge}
              {rightBadge}
            </div>
            <strong className="line-clamp-2 hover:underline underline-offset-2">
              {title}
            </strong>
            <p className="text-sm text-gray-500 text-muted-foreground line-clamp-2">
              {description}
            </p>
            {footerContent}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

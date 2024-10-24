'use client';

import React from 'react';

import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ContentCardProps extends Pick<LinkProps, 'href'> {
  coverImageUrl: string;
  category: string;
  title: string;
  description: string;
}

export default function ContentCard({
  href,
  coverImageUrl,
  category,
  title,
  description,
}: ContentCardProps) {
  return (
    <Link href={href} className="w-full h-fit mr-3">
      <Card className="overflow-hidden shadow-card hover:shadow-card-hover hover:border-border">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-40 overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>
          <div className="p-4 space-y-2 h-40">
            <Badge>{category}</Badge>
            <strong className="line-clamp-2 hover:underline underline-offset-2">
              {title}
            </strong>
            <p className="text-sm text-gray-500 text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

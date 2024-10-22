'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Preview } from '@/types/Preview';

import { Badge } from './ui/badge';

export default function ReadingPreviewCard({
  // TODO(@smosco):hits 추가
  data: { contentId, thumbnailUrl, title, category, preScripts },
}: {
  data: Preview;
}) {
  return (
    <Link
      href={`/learn/reading/detail/${contentId}`}
      className="w-full h-fit mr-3"
    >
      <Card className="overflow-hidden shadow-card hover:shadow-card-hover hover:border-border">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-40 overflow-hidden">
            <Image
              src={thumbnailUrl}
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
              {preScripts}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

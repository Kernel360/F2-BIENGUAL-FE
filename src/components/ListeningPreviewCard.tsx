'use client';

import { Clock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Preview } from '@/types/Preview';

export default function ListeningPreviewCard({
  data: { contentId, thumbnailUrl, title, category, preScripts },
}: {
  data: Preview;
}) {
  return (
    <Link
      href={`/learn/listening/detail/${contentId}`}
      className="block w-full max-w-xs"
    >
      <Card className="overflow-hidden rounded-lg hover:shadow-card-hover">
        <CardContent className="p-0">
          <div className="relative w-full h-40">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute bottom-2 right-2 flex items-center gap-1 bg-gray-200 bg-opacity-70">
              <Clock className="w-3 h-3" color="purple" />
              <span className="text-violet-800">24:00</span>
            </Badge>
          </div>
        </CardContent>
      </Card>
      <div className="mt-2 space-y-2 px-1">
        <Badge>{category}</Badge>
        <h3 className="font-bold line-clamp-2 break-words hover:underline underline-offset-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-muted-foreground line-clamp-2">
          {preScripts}
        </p>
      </div>
    </Link>
  );
}

import React from 'react';

import { cn } from '@/lib/utils';

export function LoadingPanel({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'panel  flex justify-center items-center text-sm',
        className,
      )}
    >
      {title} 불러오는 중 👀
    </div>
  );
}

export function ErrorPanel({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'panel flex justify-center items-center text-sm',
        className,
      )}
    >
      {title}을 불러오지 못했습니다.
    </div>
  );
}

export function EmptyPanel({
  title,
  message,
  className,
}: {
  title?: string;
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'panel text-gray-500  flex flex-col justify-center items-center text-sm',
        className,
      )}
    >
      <h1>{title}</h1>
      {message}
    </div>
  );
}

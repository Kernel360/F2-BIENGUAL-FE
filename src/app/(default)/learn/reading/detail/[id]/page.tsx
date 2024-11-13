/* eslint-disable react/no-array-index-key */

import type { Metadata } from 'next';

import { fetchContentDetail } from '@/api/queries/contentsQueries';
import ReadingDetailClient from '@/app/(default)/learn/reading/detail/ReadingDetailClient';

// 메타데이터 설정 함수
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const contentId = Number(params.id);
  const res = await fetchContentDetail(contentId);
  const contentDataForMeta = res.data;

  return {
    title: contentDataForMeta.title || 'Biengual',
    // description: contentData.description || '기본 설명',
    openGraph: {
      title: contentDataForMeta.title,
      // description: contentData.description,
      images: contentDataForMeta.thumbnailUrl
        ? [contentDataForMeta.thumbnailUrl]
        : 'undefined', // TODO(@godhyzzang)기본 로고 이미지 설정
    },
  };
}

export default async function DetailReadingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const contentId = Number(resolvedParams.id);

  return <ReadingDetailClient contentId={contentId} />;
}

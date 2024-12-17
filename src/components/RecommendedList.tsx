import Link from 'next/link';

import { Lock, BookOpen, Headphones } from 'lucide-react';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { RecommendedPreview } from '@/types/Preview';

import LogInOutButton from './common/LogInOutButton';
import PointCover from './common/PointCover';
import { Badge } from './ui/badge';

export default function RecommendedList({
  recommendedData,
}: {
  recommendedData: RecommendedPreview[];
}) {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <h3 className="text-2xl font-bold mb-8">
        당신을 위한 추천
        <span className="text-primary text-medium"> PICK</span>
      </h3>
      <div className="relative">
        {/* 로그인 필요 안내 */}
        {!isLogin && (
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center rounded-lg">
            <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full text-center space-y-4">
              <Lock className="w-9 h-9 mx-auto text-primary" />
              <h3 className="text-xl font-bold">맞춤 추천을 받아보세요!</h3>
              <p className="text-md text-muted-foreground">
                로그인해서 맞춤 콘텐츠를 추천받아 보세요
              </p>
              <LogInOutButton className="mt-4" />
            </div>
          </div>
        )}

        {/* 추천 콘텐츠 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedData.map((content, index) => (
            <PointCover key={content.contentId} data={content}>
              <Link
                key={content.contentId}
                href={`/learn/${content.contentType.toLowerCase()}/detail/${content.contentId}`}
                className="flex flex-col bg-background rounded-lg overflow-visible"
              >
                {/* 썸네일 및 인덱스 컨테이너 */}
                <div className="relative overflow-visible rounded-lg group">
                  {/* 썸네일 */}
                  <div className="aspect-[16/9] overflow-hidden rounded-xl group-hover:-translate-y-2 transition-all duration-300">
                    <img
                      src={content.thumbnailUrl}
                      alt={content.title}
                      className="object-cover w-full h-full rounded-lg transition-transform duration-300"
                    />
                  </div>

                  {/* 순번 표시 */}
                  <div className="absolute -bottom-6 right-5 group-hover:-translate-y-2 transition-all duration-300">
                    <div className="w-11 h-11 rounded-full border-[5px] border-white bg-violet-600 flex items-center text-lg justify-center font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* 카테고리 및 아이콘 */}
                <div className="flex gap-1 mt-6">
                  <Badge variant="secondary">{content.category}</Badge>
                  {content.contentType !== 'READING' ? (
                    <div className="flex items-center justify-center bg-gradient-to-l from-red-500 to-orange-500 rounded-sm shadow-sm">
                      <Headphones className="p-1 h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center bg-gradient-to-l from-blue-500 to-sky-500 rounded-sm shadow-sm">
                      <BookOpen className="p-1 h-6 w-6 text-white" />
                    </div>
                  )}
                </div>

                {/* 콘텐츠 제목 */}
                <p className="font-semibold text-base mt-2 mb-1 line-clamp-2">
                  {content.title}
                </p>
              </Link>
            </PointCover>
          ))}
        </div>
      </div>
    </div>
  );
}

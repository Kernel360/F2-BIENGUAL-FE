'use client';

import Link from 'next/link';

import { Lock, BookOpen, Headphones } from 'lucide-react';

import { useRecommendedContents } from '@/api/hooks/useRecommend';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { RecommendedPreview } from '@/types/Preview';

import LogInOutButton from './common/LogInOutButton';
import { Badge } from './ui/badge';

const mockContents: RecommendedPreview[] = [
  {
    contentId: 18,
    title: 'A simple guide to chaos theory - BBC World Service',
    thumbnailUrl: 'https://i.ytimg.com/vi/r_ahZOgPTsk/maxresdefault.jpg',
    contentType: 'LISTENING',
    category: 'Sports',
    isPointRequired: false,
  },
  {
    contentId: 52,
    title:
      'More than one million children in Gaza need mental health support, says UN | BBC News',
    thumbnailUrl: 'https://i.ytimg.com/vi/pPxZk0QabDQ/maxresdefault.jpg',
    contentType: 'LISTENING',
    category: 'News',
    isPointRequired: false,
  },
  {
    contentId: 10,
    title: 'Trump’s extreme vision for America hikes pressure on Harris',
    thumbnailUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/trump2.jpg',
    contentType: 'READING',
    category: 'Politics',
    isPointRequired: false,
  },
  {
    contentId: 9,
    title:
      'Fareed: How regional leaders are attempting to upend the international order',
    thumbnailUrl: 'https://i.ytimg.com/vi/Cl69AodagMU/maxresdefault.jpg',
    contentType: 'LISTENING',
    category: 'Politics',
    isPointRequired: false,
  },
  {
    contentId: 19,
    title:
      'Record number of early votes cast in Georgia as election gets underway in battleground state',
    thumbnailUrl:
      'https://media.cnn.com/api/v1/images/stellar/prod/enten2-20241016002134646.jpg',
    contentType: 'READING',
    category: 'Politics',
    isPointRequired: false,
  },
  {
    contentId: 27,
    title: 'Former One Direction member Liam Payne dies at 31',
    thumbnailUrl: 'https://i.ytimg.com/vi/q68Gfld2vis/maxresdefault.jpg',
    contentType: 'LISTENING',
    category: 'Politics',
    isPointRequired: false,
  },
  {
    contentId: 34,
    title:
      'Han Kang wins Nobel Prize in literature for ‘intense poetic prose’ confronting human fragility',
    thumbnailUrl:
      'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-591383892.jpg',
    contentType: 'READING',
    category: 'Style',
    isPointRequired: false,
  },
  {
    contentId: 11,
    title: 'Judge scrutinizes Boeing plea deal and will decide case ‘soon’',
    thumbnailUrl:
      'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2158860451.jpg',
    contentType: 'READING',
    category: 'Business',
    isPointRequired: false,
  },
  {
    contentId: 17,
    title: 'Harvard negotiator explains how to argue | Dan Shapiro',
    thumbnailUrl: 'https://i.ytimg.com/vi/IDj1OBG5Tpw/maxresdefault.jpg',
    contentType: 'LISTENING',
    category: 'Education',
    isPointRequired: false,
  },
];

export default function RecommendedList() {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = !!isLoginData?.data;

  const {
    data: recommendedContents,
    isLoading,
    isError,
  } = useRecommendedContents();

  const contents = isLogin
    ? recommendedContents?.data.recommendedContents || []
    : mockContents;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <h3 className="text-2xl font-bold mb-5">추천 콘텐츠</h3>
      <div className="relative">
        {!isLogin && (
          <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center rounded-lg">
            <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full text-center space-y-4 backdrop-blur-sm">
              <Lock className="w-9 h-9 mx-auto text-primary" />
              <h3 className="text-xl font-bold">맞춤 추천을 받아보세요!</h3>
              <p className="text-sm text-muted-foreground">
                로그인하시면 나만의 학습 기록을 기반으로 한 맞춤 콘텐츠를
                추천해드립니다.
              </p>
              <LogInOutButton />
            </div>
          </div>
        )}

        {/* TODO(@smosco): 대체 어떻게 로딩, 에러 상태를 표시하는게 좋은지 모르겠음 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLogin && isLoading && (
            <div className="flex h-64">
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          )}

          {isLogin && isError && (
            <div className="flex h-64">
              <p>추천 콘텐츠를 불러오지 못했습니다.</p>
            </div>
          )}

          {contents.map((content, index) => (
            <Link
              key={content.contentId}
              href={`/learn/${content.contentType.toLowerCase()}/detail/${content.contentId}`}
              className="flex items-center space-x-4 bg-background rounded-lg p-3 relative"
            >
              <div className="absolute bottom-0 left-1 w-8 h-8 flex items-center justify-center">
                <span className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                  {index + 1}
                </span>
              </div>
              <div className="w-1/3 h-28">
                <img
                  src={content.thumbnailUrl}
                  alt={content.title}
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-2 line-clamp-2">
                  {content.title}
                </h3>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {content.category}
                  </Badge>

                  {content.contentType !== 'READING' ? (
                    <div className="flex justify-center items-center bg-gradient-to-l from-red-500 to-orange-500 rounded-sm shadow-sm">
                      <Headphones className="p-1 h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center bg-gradient-to-l from-blue-500 to-sky-500 rounded-sm shadow-sm  ">
                      <BookOpen className="p-1 h-6 w-6  text-white" />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

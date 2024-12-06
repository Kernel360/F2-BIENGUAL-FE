'use client';

import { useEffect, useState } from 'react';

import { useFetchCategoriesByContentType } from '@/api/hooks/useCategories';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSetSearchParams } from '@/hooks/useSetSearchParams';

export default function ContentTypeFilter() {
  const { path, searchParams, setSearchParams } = useSetSearchParams();

  const linkItems = [
    { href: `/learn/listening`, label: '리스닝', key: 'listening' },
    { href: `/learn/reading`, label: '리딩', key: 'reading' },
  ];
  // 선택한 카테고리 버튼에 색깔반영 위해 currentCategoryId를 state로 관리
  const currentCategoryId = searchParams.get('categoryId') || '';
  

  const listeningCategories =
    useFetchCategoriesByContentType('LISTENING').data?.data.categoryList || [];
  const readingCategories =
    useFetchCategoriesByContentType('READING').data?.data.categoryList || [];
  const categories = path.includes('/learn/listening')
    ? listeningCategories
    : readingCategories;

 
  useEffect(() => {
    if (categories) {
      const validCategory = categories.some(
        (category) => category.id === Number(currentCategoryId),
      )
        ? currentCategoryId
        : '';
      setSearchParams({ path: '', params: { categoryId: validCategory } });
    }
  }, [categories]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {/* 리딩,리스닝 선택 버튼 */}
        {linkItems.map(({ href, label, key }) => {
          const isActive = path.startsWith(href);

          return (
            <Button
              key={key}
              variant={isActive ? 'default' : 'outline'}
              className="rounded-full px-4 py-2 text-sm font-medium"
              onClick={() => {
                setSearchParams({
                  path: href,
                  params: {
                    page: '1',
                    categoryId: categories.some(
                      (category) => category.id === Number(currentCategoryId),
                    )
                      ? currentCategoryId
                      : '',
                  },
                });
              }}
            >
              {label}
            </Button>
          );
        })}
      </div>
      {/* 카테고리 선택 버튼 */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setSearchParams({ path, params: { categoryId: '' } });
          }}
          className={`px-3 py-1 rounded-full text-sm ${
            !searchParams.get('categoryId')
              ? 'bg-primary text-primary-foreground'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          전체
        </button>

        {categories.map((category) => {
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setSearchParams({
                  path,
                  params: {
                    categoryId:
                      currentCategoryId === String(category.id)
                        ? ''
                        : String(category.id),
                  },
                });
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                currentCategoryId === String(category.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      {/* 정렬 버튼 */}
      <div className="flex justify-end">
        <div className="flex min-w-[100px]">
          {/* TODO(@godhyzzang): 새로고침하면 최신순이 잠깐 안 보였다가 보임 */}
          <Select
            onValueChange={(value) => {
              setSearchParams({ path, params: { sort: value } });
            }}
            value={searchParams.get('sort') || 'createdAt'}
          >
            <SelectTrigger>
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent className="min-w-[100px]">
              <SelectItem value="createdAt">최신순</SelectItem>
              <SelectItem value="hits">인기순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { useFetchAllCategories } from '@/api/hooks/useCategories';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContentTypeFilter() {
  const path = usePathname();
  const linkItems = [
    { href: `/learn/listening`, label: '리스닝', key: 'listening' },
    { href: `/learn/reading`, label: '리딩', key: 'reading' },
  ];
  // 선택한 카테고리 버튼에 색깔반영 위해 currentCategoryId를 state로 관리
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get('categoryId') || '';
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    currentCategoryId || '',
  );
  // TODO(@godhyzzang)ContentTypeFilter가 여러 페이지에서 쓰이게 될텐데 이렇게 매번 api를 불러오는게 맞는지 의문이 든다.
  const { data: categoriesData } = useFetchAllCategories();
  const categories = categoriesData?.data.categoryList || [];

  const handleSelectCategories = (categoryId: number) => {
    setSelectedCategoryId((prevCategoryId) =>
      prevCategoryId === String(categoryId) ? '' : String(categoryId),
    );
  };
  const generateQueryParams = (additionalParams: Record<string, string>) => {
    return {
      ...Object.fromEntries(searchParams.entries()), // 이전에 선택한 queryparams 유지
      ...additionalParams,
    };
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {/* 리딩,리스닝 선택 버튼 */}
        {linkItems.map(({ href, label, key }) => {
          const isActive = path.startsWith(href);

          return (
            <Link
              key={key}
              href={{
                pathname: href,
                query: generateQueryParams({ page: '1' }), // 항상 page=1로 이동
              }}
            >
              <Button
                variant={isActive ? 'default' : 'outline'}
                className="rounded-full px-4 py-2 text-sm font-medium"
              >
                {label}
              </Button>
            </Link>
          );
        })}
      </div>
      {/* 카테고리 선택 버튼 */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={{
            pathname: path,
            query: generateQueryParams({ categoryId: '' }), // 전체 카테고리 선택
          }}
        >
          <button
            type="button"
            onClick={() => handleSelectCategories(0)}
            className={`px-3 py-1 rounded-full text-sm ${
              !searchParams.get('categoryId')
                ? 'bg-primary text-primary-foreground'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            전체
          </button>
        </Link>

        {categories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: path,
              query: generateQueryParams({
                categoryId:
                  selectedCategoryId === String(category.id)
                    ? ''
                    : String(category.id),
              }),
            }}
          >
            <button
              type="button"
              onClick={() => handleSelectCategories(category.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategoryId === String(category.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          </Link>
        ))}
      </div>
      {/* 정렬 버튼 */}
      <div className="flex justify-end">
        <div className="flex min-w-[100px]">
          <Select
            onValueChange={(value) => {
              window.location.href = `${path}?${new URLSearchParams(
                generateQueryParams({ sort: value }),
              ).toString()}`;
            }}
            value={searchParams.get('sort') || 'createdAt'}
          >
            <SelectTrigger>
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent className="min-w-[100px]">
              <SelectItem value="createdAt" className="">
                최신순
              </SelectItem>
              <SelectItem value="hits" className="">
                인기순
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

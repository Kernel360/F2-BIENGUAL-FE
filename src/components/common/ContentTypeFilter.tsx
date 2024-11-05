'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { useFetchAllCategories } from '@/api/hooks/useCategories';
import { Button } from '@/components/ui/button';

export default function ContentTypeFilter() {
  const path = usePathname();
  const linkItems = [
    { href: `/learn/listening`, label: '리스닝', key: 'listening' },
    { href: `/learn/reading`, label: '리딩', key: 'reading' },
  ];
  // 선택한 카테고리 버튼에 색깔반영 위해 currentCategoryId를 state로 관리
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get('categoryId') || '';
  const [params, setParams] = useState(currentCategoryId || '');
  // TODO(@godhyzzang)ContentTypeFilter가 여러 페이지에서 쓰이게 될텐데 이렇게 매번 api를 불러오는게 맞는지 의문이 든다.
  const { data: categoriesData } = useFetchAllCategories();
  const categories = categoriesData?.data.categoryList || [];

  const toggleCategory = (categoryId: number) => {
    setParams((prevParams) =>
      prevParams === String(categoryId) ? '' : String(categoryId),
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {linkItems.map(({ href, label, key }) => {
          const isActive = path.startsWith(href);

          return (
            <Link
              key={key}
              href={{
                pathname: href,
                query: {
                  page: 1,
                },
              }} // 항상 page=1로 이동
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

      <div className="flex flex-wrap gap-2">
        <Link
          href={{
            pathname: path,
          }}
        >
          <button
            type="button"
            className={`px-3 py-1 rounded-full text-sm ${
              params.length === 0
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
              query: {
                categoryId:
                  params === String(category.id) ? '' : String(category.id),
              },
            }}
          >
            <button
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                params === String(category.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

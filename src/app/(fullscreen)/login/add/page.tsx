'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export interface Category {
  code: string;
  message: string;
  data: { categoryList: CategoryList[] };
}

export interface CategoryList {
  id: number;
  name: string;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const fetchCategories = async (): Promise<Category> => {
  const response = await fetch(`${BASE_URL}/categories/all`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

const preferedCategories = async () => {
  // todo : 추가필요
};
export default function LoginAddPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoryList[]>([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const initialCategories = await fetchCategories();
        console.log(initialCategories);

        // 응답 데이터가 배열인지 확인하고 설정
        if (Array.isArray(initialCategories.data.categoryList)) {
          setCategories(initialCategories.data.categoryList);
        } else {
          console.error(
            'Categories data is not an array:',
            initialCategories.data,
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected?.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...(prevSelected || []), categoryId],
    );
  };

  return (
    <div className="mt-8 w-full">
      <h2 className="text-lg font-semibold mb-4">관심있는 카테고리를 ㄱ</h2>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategories?.includes(category.id)
                ? 'bg-primary text-primary-foreground'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <Button onClick={preferedCategories}>관심 카테고리 제출</Button>
    </div>
  );
}

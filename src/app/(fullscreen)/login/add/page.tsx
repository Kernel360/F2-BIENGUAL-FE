'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CategoryList } from '@/types/Category';
import { fetchAllCategories } from '@/api/fetchAllCategories';

const preferedCategories = async () => {
  // todo : 개인별 선호하는 카테고리 추가 연결필요
};
export default function LoginAddPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllCategories = async () => {
    try {
      const initialCategories = await fetchAllCategories();
      console.log(initialCategories);

      setCategories(initialCategories.data.categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId],
    );
  };

  return (
    <div className=" flex items-center justify-center  min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50">
      <Card className="h-84 mx-8 my-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-3xl font-bold py-6 mb-6 text-center text-violet-700 dark:text-gray-100">
          읽고싶은 글이나 영상의 카테고리를 골라주세요!
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2  gap-4 mx-44 ">
            {categories.map((category) => (
              <Button
                type="button"
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`py-4 rounded-xl text-lg font-medium transition-all duration-200 ease-in-out ${
                  selectedCategories.includes(category.id)
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={preferedCategories}
            className="px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-105"
          >
            다 골랐어요
          </Button>
        </div>
      </Card>
    </div>
  );
}

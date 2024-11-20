'use client';

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useFetchAllCategories } from '@/api/hooks/useCategories';
import { useUpdateUserInfo } from '@/api/hooks/useUserInfo';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CategoryList } from '@/types/Category';

export default function LoginAddPage() {
  const { data, isLoading } = useFetchAllCategories();

  const [categories, setCategories] = useState<CategoryList[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const updateUserInfoMutation = useUpdateUserInfo();
  const router = useRouter();

  const toast = useToast();

  useEffect(() => {
    if (data) {
      setCategories(data.data.categoryList);
    }
  }, [data]);

  const handlePreferedCategories = () => {
    if (selectedCategories.length !== 0 && selectedCategories.length <= 5) {
      updateUserInfoMutation.mutate(
        { categories: selectedCategories },
        {
          onSuccess: () => {
            router.push('/');
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };
  const notChoosingCategories = async () => {
    router.push('/');
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      }
      if (prevSelected.length < 5) {
        return [...prevSelected, categoryId];
      }

      toast.toast({
        description: '카테고리는 최대 5개까지 선택 가능합니다.',
      });

      return prevSelected;
    });
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-screen w-full">
      <LoadingSpinner />
    </div>
  ) : (
    <div className=" flex items-center justify-center  min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50">
      <Card className="h-84 mx-8 my-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-3xl font-bold py-6 mb-6 text-center text-violet-600  dark:text-gray-100">
          <br />
          첫 방문이시군요! 환영합니다!👋
          <br />
          <br />
          <span className="text-2xl text-gray-400 font-medium">
            {' '}
            읽고싶은 아티클🖋️이나 영상 🖥️의 카테고리를 골라주세요!
            <br />
            선택한 카테고리 위주로 콘텐츠 추천이 제공됩니다.
          </span>
        </p>

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

        <div className=" flex mt-20 mx-96 gap-2 ">
          <Button
            onClick={notChoosingCategories}
            className="bg-violet-100 text-gray px-6 py-2 rounded-3xl text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-105 hover:bg-violet-200/90"
          >
            나중에 고를래요
          </Button>
          <Button
            onClick={handlePreferedCategories}
            className="bg-violet-600 px-6 py-2  rounded-3xl text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            다 골랐어요
          </Button>
        </div>
      </Card>
    </div>
  );
}

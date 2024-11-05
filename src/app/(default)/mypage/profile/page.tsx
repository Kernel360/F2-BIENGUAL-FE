'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState, useMemo } from 'react';

import { Camera, X } from 'lucide-react';

import { useUserInfo, useUpdateUserInfo } from '@/api/hooks/useUserInfo';
import { fetchAllCategories } from '@/api/queries/fetchAllCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryList } from '@/types/Category';
import { useToast } from '@/hooks/use-toast';
export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);

  const { data: userData, refetch: refetchUserInfo } = useUserInfo();
  const [nickname, setNickname] = useState('');

  // 초기 카테고리 목록
  const [categories, setCategories] = useState<CategoryList[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const updateUserInfoMutation = useUpdateUserInfo();
  const toast = useToast();

  useEffect(() => {
    if (userData) {
      setNickname(userData.data.nickname || '');

      if (userData.data.myCategories) {
        setSelectedCategories(
          userData.data.myCategories.map((category) => category.id),
        );
      }

      const getAllCategories = async () => {
        try {
          const initialCategories = await fetchAllCategories();
          setCategories(initialCategories.data.categoryList);
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setIsLoading(false);
        }
      };

      getAllCategories();
    }
  }, [userData]);

  const handleNicknameChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateUserInfoMutation.mutate(
      { nickname },
      {
        onSuccess: () => {
          refetchUserInfo();
        },
      },
    );
  };

  const isNicknameChanged = useMemo(() => {
    return nickname !== userData?.data.nickname;
  }, [nickname, userData?.data.nickname]);

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

  // selectedCategories와 myCategories가 동일한지 여부를 확인
  const isCategoriesChanged = useMemo(() => {
    const userCategoriesIds =
      userData?.data?.myCategories?.map((category) => category.id) || [];
    return (
      selectedCategories.length !== userCategoriesIds.length ||
      selectedCategories.some((id) => !userCategoriesIds.includes(id))
    );
  }, [selectedCategories, userData?.data?.myCategories]);

  const updateCategories = () => {
    // 카테고리 선택 안 할 수도 있음
    if (selectedCategories.length <= 5) {
      updateUserInfoMutation.mutate(
        { categories: selectedCategories },
        {
          onSuccess: () => {
            toast.toast({
              description: '카테고리가 성공적으로 변경되었습니다.',
            });
          },
          onError: (error) => {
            console.log(error);
          },
        },
      );
    }
  };

  return (
    <div className="  bg-white min-h-screen">
      <header className="flex items-center p-3 border-b ">
        <h1 className="flex-1 text-center font-semibold">개인정보수정</h1>
      </header>
      <div className="p-4 max-w-xl flex flex-col justify-center items-center mx-auto">
        <div className="flex justify-center mb-6">
          {/* 프로필사진 */}
          <div className="relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            {/* todo : 사진 버튼 눌렀을 때 마이페이지 추가 */}
            {/* <input type="file" /> */}
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-1"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 bg-gray-100 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* 내 정보 수정 */}
        <form className="space-y-4 w-full " name="userInfo">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1 "
            >
              닉네임 *
            </label>
            <div className="flex gap-2">
              <Input
                id="name"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="flex-1"
                autoComplete="on"
              />
              <Button
                variant="outline"
                size="sm"
                disabled={!isNicknameChanged}
                onClick={handleNicknameChange}
                // type="submit"
              >
                변경하기
              </Button>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일 *
            </label>
            <div className="flex gap-2">
              <Input
                id="email"
                readOnly
                disabled
                value={userData?.data.email || ''}
                className="flex-1"
                autoComplete="on"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호 *
            </label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="password"
                value="12345678"
                readOnly
                className="flex-1"
                autoComplete="on"
                disabled
              />
            </div>
          </div>
          <div />
        </form>
        {/* 카테고리 수정 */}
        <div className="mt-8 w-full">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">관심 카테고리</h2>
            <Button
              variant="outline"
              size="sm"
              disabled={!isCategoriesChanged} // 카테고리 변경사항이 없으면 변경버튼 disabled
              onClick={updateCategories}
            >
              변경하기
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              // eslint-disable-next-line react/button-has-type
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategories.includes(category.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

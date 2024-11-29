'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useMemo } from 'react';
// TODO(@godhyzzang) : 나중에 프로필 업로드 기능 추가
// import { Camera, X } from 'lucide-react';

import { useFetchAllCategories } from '@/api/hooks/useCategories';
import { useUserInfo, useUpdateUserInfo } from '@/api/hooks/useUserInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function UserProfile() {
  const { data: userData, refetch: refetchUserInfo } = useUserInfo();
  const { data: categoryData } = useFetchAllCategories();
  const { toast } = useToast();

  // 상태 설정
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const updateUserInfoMutation = useUpdateUserInfo();

  // 초기 데이터 동기화
  useEffect(() => {
    if (userData?.data) {
      setNickname(userData.data.nickname || '');
      setUsername(userData.data.username || '');
      setSelectedCategories(
        userData.data.myCategories?.map((category) => category.id) || [],
      );
    }
  }, [userData]);

  // 닉네임 변경
  const handleNicknameChange = () => {
    // 닉네임 길이 검증
    if (nickname.length < 4 || nickname.length > 12) {
      toast({
        duration: 1000,
        description: '닉네임은 4~12자 사이여야 합니다.',
      });
      return;
    }

    // 닉네임 패턴 검증
    const nicknamePattern = /^[a-zA-Z가-힣0-9]+( [a-zA-Z가-힣0-9]+)*$/;
    if (!nicknamePattern.test(nickname)) {
      toast({
        duration: 1000,
        description: '닉네임은 영어, 한글, 숫자 및 단일 공백만 허용됩니다.',
      });
      return;
    }

    // 서버로 닉네임 변경 요청
    updateUserInfoMutation.mutate(
      { nickname },
      {
        onSuccess: () => {
          toast({
            duration: 1000,
            description: '닉네임이 성공적으로 변경되었습니다.',
          });
          refetchUserInfo();
        },
        onError: () => {
          toast({ duration: 1000, description: '닉네임을 변경하지 못했어요.' });
          setNickname(userData?.data.nickname || '');
        },
      },
    );
  };

  // 이름 변경
  const handleUsernameChange = () => {
    updateUserInfoMutation.mutate(
      { username },
      {
        onSuccess: () => {
          toast({
            duration: 1000,
            description: '이름이 성공적으로 변경되었습니다.',
          });
          refetchUserInfo();
        },
        onError: () => {
          toast({ duration: 1000, description: '이름을 변경하지 못했어요.' });
          setUsername(userData?.data.username || '');
        },
      },
    );
  };

  // 닉네임 변경 여부 확인
  const isNicknameChanged = useMemo(() => {
    return nickname !== userData?.data.nickname;
  }, [nickname, userData?.data.nickname]);

  // 이름 변경 여부 확인
  const isUsernameChanged = useMemo(() => {
    return username !== userData?.data.username;
  }, [username, userData?.data.username]);

  // 카테고리 토글
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      }
      if (prevSelected.length < 5) {
        return [...prevSelected, categoryId];
      }

      toast({
        duration: 1000,
        description: '카테고리는 최대 5개까지 선택 가능합니다.',
      });

      return prevSelected;
    });
  };

  // 카테고리 변경 여부 확인
  const isCategoriesChanged = useMemo(() => {
    const initialCategories =
      userData?.data.myCategories?.map((category) => category.id) || [];
    return (
      selectedCategories.length !== initialCategories.length ||
      selectedCategories.some((id) => !initialCategories.includes(id))
    );
  }, [selectedCategories, userData?.data.myCategories]);

  // 카테고리 변경
  const updateCategories = () => {
    updateUserInfoMutation.mutate(
      { categories: selectedCategories },
      {
        onSuccess: () => {
          toast({
            duration: 1000,
            description: '카테고리가 성공적으로 변경되었습니다.',
          });
          refetchUserInfo();
        },
        onError: () => {
          toast({
            duration: 1000,
            description: '카테고리를 변경하지 못했습니다.',
          });
          setSelectedCategories(
            userData?.data.myCategories?.map((category) => category.id) || [],
          );
        },
      },
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="flex items-center p-3 border-b">
        <h1 className="flex-1 text-center  font-semibold">개인정보수정</h1>
      </header>
      <div className="p-4 max-w-xl flex flex-col justify-center items-center mx-auto">
        {/* <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
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
        </div> */}

        <form className="space-y-4 w-full m-8">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              닉네임 *
            </label>
            <div className="flex gap-2">
              <Input
                id="nickname"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button" // 새로고침 방지
                variant="outline"
                size="sm"
                disabled={!isNicknameChanged}
                onClick={handleNicknameChange}
              >
                변경하기
              </Button>
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이름 *
            </label>
            <div className="flex gap-2">
              <Input
                id="username"
                placeholder="이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button" // 새로고침 방지
                variant="outline"
                size="sm"
                disabled={!isUsernameChanged}
                onClick={handleUsernameChange}
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
              />
            </div>
          </div>
        </form>

        <div className="mt-8 w-full">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">관심 카테고리</h2>
            <Button
              variant="outline"
              size="sm"
              disabled={!isCategoriesChanged}
              onClick={updateCategories}
            >
              변경하기
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryData?.data.categoryList?.map((category) => (
              <button
                key={category.id}
                type="button"
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

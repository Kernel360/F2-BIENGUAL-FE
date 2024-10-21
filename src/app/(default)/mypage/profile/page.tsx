'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState, useMemo } from 'react';
import { useUserInfo, useUpdateUserInfo } from '@/api/hooks/useUserInfo';

// todo : 개인 선호 카테고리 연결 필요

const categories = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'Health' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Sports' },
  { id: 5, name: 'Science' },
  { id: 6, name: 'Language' },
  { id: 7, name: 'Design' },
  { id: 8, name: 'Music' },
  { id: 9, name: 'Life' },
  { id: 10, name: 'Fashion' },
  { id: 11, name: 'Food' },
  { id: 12, name: 'Finance' },
  { id: 13, name: 'Movie' },
  { id: 14, name: 'Art' },
];

export default function UserProfile() {
  const [nickname, setNickname] = useState('');
  // const [phone, setPhone] = useState(''); // todo : 나중에 핸드폰 로직 추가
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const { data: userData, refetch: refetchUserInfo } = useUserInfo();

  const { mutate: updateUserInfoMutation } = useUpdateUserInfo();

  useEffect(() => {
    if (userData) {
      setNickname(userData.data.nickname || '');
      // todo : 나중에 핸드폰 로직 추가
      // if (userData.data.phoneNumber) {
      //   setPhone(userData.data.phoneNumber || '');
      // }
    }
  }, [userData]);

  const isNicknameChanged = useMemo(() => {
    return nickname !== userData?.data.nickname;
  }, [nickname, userData?.data.nickname]);

  const handleNicknameChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateUserInfoMutation(
      { nickname },
      {
        onSuccess: () => {
          refetchUserInfo();
        },
      },
    );
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <div className="  bg-white min-h-screen">
      <header className="flex items-center p-3 border-b ">
        <h1 className="flex-1 text-center font-semibold">개인정보수정</h1>
      </header>
      <div className="p-4 max-w-xl flex flex-col justify-center items-center mx-auto">
        <div className="flex justify-center mb-6">
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
          <div>
            {/* todo : 나중에 연결하기 */}
            {/* <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              휴대폰 번호
            </label>
            <div className="flex gap-2">
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly
                disabled
                className="flex-1"
                autoComplete="on"
              />
              <Button variant="outline" size="sm">
                변경하기
              </Button>
            </div> */}
          </div>
        </form>
        <div className="mt-8 w-full">
          <h2 className="text-lg font-semibold mb-4">관심 카테고리</h2>
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

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateContentsResponse } from '@/types/CreateContents';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/contents`;

const createContents = async (
  contentType: 'LISTENING',
  url: string,
): Promise<CreateContentsResponse> => {
  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ contentType, url }),
  });

  if (!response.ok) {
    throw new Error('Failed to create Contents by admin');
  }

  return response.json();
};

export default function AdminCreate() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CreateContentsResponse | null>(null);

  const handleCreateContents = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 로딩 상태 시작
    setResponse(null); // 이전 응답 초기화

    try {
      const apiResponse = await createContents('LISTENING', url);
      setResponse(apiResponse); // 응답 데이터 저장
      alert('컨텐츠가 추가되었습니다');
    } catch (error) {
      console.error('Error creating content:', error);
      alert('컨텐츠 추가에 실패했습니다.');
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">영상 컨텐츠 추가</h1>
      <form
        onSubmit={handleCreateContents}
        className="flex justify-between items-center mb-5"
      >
        <Input
          placeholder="영상URL을 넣으면 영상스크립트와 페이지가 생성됩니다"
          className="bg-white flex-grow mr-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? '로딩 중...' : '영상컨텐츠추가'}
        </Button>
      </form>
      <br />
      {loading && <div>로딩 중입니다...</div>}
      {response && (
        <div className="mt-5">
          <h2 className="text-lg font-bold">응답 데이터:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>{' '}
        </div>
      )}
    </div>
  );
}

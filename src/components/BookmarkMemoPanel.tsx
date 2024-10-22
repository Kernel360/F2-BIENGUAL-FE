import React, { SetStateAction, useState } from 'react';

import { useParams } from 'next/navigation';

import { BookmarkPlus, MessageSquarePlus } from 'lucide-react';

import { useFetchBookmarksByContendId } from '@/api/hooks/useBookmarks';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import useHandleBookmark from '@/hooks/useHandleBookmark';
import { convertTime } from '@/lib/convertTime';
import { findCurrentSubtitleIndex } from '@/lib/findCurrentSubtitleIndex';
import useThrottling from '@/lib/useThrottling';
import { Script } from '@/types/ContentDetail';

import BookmarkMemoItem from './BookmarkMemoItem';
import EmptyAlert from './EmptyAlert';
import ListeningMemoForm from './ListeningMemoForm';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface BookmarkMemoPanelProps {
  scriptsData: Script[] | undefined;
  currentTime: number;
  seekTo: (timeInSeconds: number) => void;
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>;
  setShowLoginModal: React.Dispatch<SetStateAction<boolean>>;
}

export default function BookmarkMemoPanel({
  scriptsData,
  currentTime,
  seekTo,
  setIsPlaying,
  setShowLoginModal,
}: BookmarkMemoPanelProps) {
  const params = useParams();
  const contentId = Number(params.id);

  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인

  const { data: bookmarkData } = useFetchBookmarksByContendId(contentId);

  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<
    number | null
  >(null);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const { toast } = useToast(); // 토스트 알림에 사용할 훅

  const currentSubtitleIndex =
    findCurrentSubtitleIndex(scriptsData, currentTime) ?? 0;

  const { addBookmark, addMemo } = useHandleBookmark(contentId);

  const handleSaveNewNote = () => {
    if (selectedSentenceIndex !== null) {
      addMemo(selectedSentenceIndex, newNoteText);
      setIsAddingNote(false);
      setIsPlaying(true);
    }
  };

  const handleCancelNewNote = () => {
    setIsAddingNote(false);
    setIsPlaying(true);
  };

  const handleBookmark = () => {
    // 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    addBookmark(currentSubtitleIndex);
  };

  const handleMemo = () => {
    // 로그인 권한 없으면 로그인 모달 띄우기
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    // 로그인 권한 있을때만 아래 실행
    if (
      bookmarkData?.data.bookmarkList.some(
        (bookmark) => bookmark.sentenceIndex === currentSubtitleIndex,
      )
    ) {
      toast({
        title: '이미 해당 시간에 북마크가 존재합니다.',
        description: '북마크 아래 메모영역에 메모를 추가해주세요.',
        duration: 1000,
      });
      return;
    }

    if (currentSubtitleIndex !== null && currentSubtitleIndex !== undefined) {
      setSelectedSentenceIndex(currentSubtitleIndex);
      setNewNoteText('');
      setIsAddingNote(true);
      setIsPlaying(false);
    }
  };
  // thorottle 적용
  const throttledHandleBookmark = useThrottling({
    buttonClicked: handleBookmark,
  });
  const throttledHandleMemo = useThrottling({
    buttonClicked: handleMemo,
  });

  return (
    <div className="col-span-1">
      <Card className="h-full flex flex-col justify-between p-4 bg-violet-100">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">Bookmarks & Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[560px] mb-4 rounded-lg">
            {/* 메모 추가 컴포넌트 */}
            {isAddingNote && selectedSentenceIndex !== null && (
              <div className="mb-4 p-2 bg-white rounded-lg">
                <div className="flex flex-col justify-between items-start mb-2">
                  <Button
                    variant="secondary"
                    className="rounded-full h-6 px-3 bg-violet-100 text-violet-700 hover:bg-violet-200"
                  >
                    {scriptsData?.[selectedSentenceIndex]?.startTimeInSecond &&
                      convertTime(
                        scriptsData[selectedSentenceIndex].startTimeInSecond,
                      )}
                  </Button>
                  <p className="text-[14px] text-gray-600 mt-1">
                    {scriptsData?.[selectedSentenceIndex]?.enScript ||
                      '문장 없음'}
                  </p>
                </div>
                <ListeningMemoForm
                  memo={newNoteText}
                  setMemo={setNewNoteText}
                  handleCancelEdit={handleCancelNewNote}
                  handleSaveMemo={handleSaveNewNote}
                  isEditing={isAddingNote}
                />
              </div>
            )}

            {/* 북마크, 메모 목록 */}
            {bookmarkData && bookmarkData.data.bookmarkList.length > 0
              ? bookmarkData.data.bookmarkList.map((bookmark) => {
                  const subtitle = scriptsData?.[bookmark.sentenceIndex];
                  return (
                    <BookmarkMemoItem
                      key={bookmark.bookmarkId}
                      bookmark={bookmark}
                      subtitle={subtitle}
                      seekTo={seekTo}
                    />
                  );
                })
              : !selectedSentenceIndex && ( // 메모 저장이 안 되었어도 '메모추가' 버튼 누르는 순간부터 북마크가 없다는 메세지는 안 보여야함
                  <EmptyAlert alertDescription="북마크가 없습니다." />
                )}
          </ScrollArea>
        </CardContent>

        <div className="flex flex-col gap-2 justify-between items-center lg:flex-row">
          <Button onClick={throttledHandleBookmark} className="w-full ">
            <BookmarkPlus size={20} className="mr-2" />
            북마크
          </Button>
          <Button onClick={throttledHandleMemo} className="w-full">
            <MessageSquarePlus size={20} className="mr-2" />
            메모 추가
          </Button>
        </div>
      </Card>
    </div>
  );
}

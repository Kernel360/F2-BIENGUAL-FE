import { PanelRightClose, PanelRightOpen, Minus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BookmarkSidebarProps {
  bookMarkedSentences: string[];
  toggleBookmark: (sentence: string) => void;
}
// todo : 색깔 등 ui 디벨롭 필요

export default function BookmarkSidebar({
  bookMarkedSentences,
  toggleBookmark,
}: BookmarkSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* 사이드바 */}
      <div
        className={`fixed top-20 right-0 h-[30%] w-[30%] transform transition-transform duration-300 ease-in-out z-40 bg-gray-50 bg-opacity-70 backdrop-blur-lg rounded-lg
      ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
       xl:w-[300px] drop-shadow-xl `}
      >
        {/* todo : drag & drop으로 위치 변경 가능하게 만들기? or 배경화면 투명하게 */}
        {/* todo : 모바일 화면이면 30%민 보이도록 */}
        {/* 사이드바 콘텐츠 */}
        <Tabs
          defaultValue="bookMarkedSentences"
          className="h-full flex flex-col"
        >
          <TabsList className="w-full flex-shrink-0">
            <TabsTrigger value="bookMarkedSentences" className="w-[50%]">
              문장
            </TabsTrigger>
            <TabsTrigger value="bookMarkedVoca" className="w-[50%]">
              단어
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="bookMarkedSentences"
            className="flex-grow overflow-auto"
          >
            <ScrollArea className="h-full">
              <div className="px-4">
                {bookMarkedSentences.map((sentence, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <div>
                    <Button
                      onClick={() => toggleBookmark(sentence)}
                      className="w-4 h-4 p-1 mr-1 bg-red-500"
                    >
                      <Minus />
                    </Button>
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="inline-block line-clamp-2 rounded-lg"
                    >
                      {sentence}
                    </li>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="vertical" className=" bg-muted " />
            </ScrollArea>
          </TabsContent>
          <TabsContent
            value="bookMarkedVoca"
            className="flex-grow overflow-auto"
          >
            <ScrollArea className="h-full">
              <div className="px-4">Change your password here.</div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      {/* 사이드바 열림 닫힘 조절 버튼 */}
      <div className="fixed top-16 right-0 z-50">
        <Button
          onClick={toggleSidebar}
          className={`p-2 rounded-full shadow-lg ${isSidebarOpen ? 'bg-purple-500 hover:bg-purple-500' : ''}`}
        >
          {isSidebarOpen ? (
            <PanelRightOpen className="w-5 h-5" />
          ) : (
            <PanelRightClose className="w-5 h-5" />
          )}
        </Button>
      </div>
    </>
  );
}

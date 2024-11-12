import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Sentence {
  english: string;
  korean: string;
}

export const sentences: Sentence[] = [
  {
    english: 'The early bird catches the worm.',
    korean: '일찍 일어나는 새가 벌레를 잡는다.',
  },
  {
    english: 'Actions speak louder than words.',
    korean: '행동이 말보다 더 큰 소리를 낸다.',
  },
  {
    english: 'Practice makes perfect.',
    korean: '연습이 완벽을 만든다.',
  },
  {
    english: "Where there's a will, there's a way.",
    korean: '뜻이 있는 곳에 길이 있다.',
  },
  {
    english: "Don't judge a book by its cover.",
    korean: '겉모습으로 판단하지 마라.',
  },
  {
    english: 'Time is money.',
    korean: '시간은 돈이다.',
  },
  {
    english: 'Better late than never.',
    korean: '늦는 것이 안 하는 것보다 낫다.',
  },
  {
    english: 'Two heads are better than one.',
    korean: '백지장도 맞들면 낫다.',
  },
  {
    english: 'When in Rome, do as the Romans do.',
    korean: '로마에서는 로마법을 따르라.',
  },
  {
    english: 'The pen is mightier than the sword.',
    korean: '펜은 칼보다 강하다.',
  },
];

export default function SentenceComponent({ data }: { data: Sentence }) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <Card className="w-[783px] h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-lg">
      <CardContent className="p-8 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              다른 사람들이 저장한 문장
            </h3>
            <p className="text-xl text-white mb-6">{data.english}</p>
            {showTranslation && (
              <p className="text-lg text-gray-200">{data.korean}</p>
            )}
          </div>
          <div className="text-right">
            {/* 문장이 있는 해당 페이지로 가는 <a/> tag */}
            <a
              href={`/content/${data.english}`}
              className="text-sm text-blue-300 underline"
            >
              Go to Page
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            size="lg"
            className=" border-white hover:border-purple-300 hover:bg-purple-300 hover:text-white text-purple-500"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide Translation' : 'Show Translation'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

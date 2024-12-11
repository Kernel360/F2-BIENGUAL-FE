import { useState } from 'react';

// import { Quote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PoplularBookmarks } from '@/types/Preview';

export default function SentenceComponent({
  data,
}: {
  data: PoplularBookmarks;
}) {
  const [showTranslation, setShowTranslation] = useState(false);
  return (
    <Card className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-lg">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start relative">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex gap-2 ">
              {/* <Quote className="transform rotate-180" fill="white" /> 다른
              사람들이 저장한 문장 <Quote fill="white" /> */}
              다른 사람들이 저장한 문장
            </h3>

            <div key={data.contentId} className="">
              <p className="text-sm text-white mb-2">“ {data.enDetail} ”</p>
              {showTranslation && (
                <p className="text-sm text-gray-200">“ {data.koDetail} ”</p>
              )}
            </div>
          </div>
          {/* 문장이 있는 해당 페이지로 가는 <a/> tag */}
          <div className="absolute -bottom-12 right-0 ">
            <a
              href={`/learn/reading/detail/${data.contentId}`}
              className="text-sm text-blue-300 underline"
            >
              Go to Page
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button
            variant="outline"
            size="sm"
            className="mt-2 border-white hover:border-purple-300 hover:bg-purple-300 hover:text-white text-purple-500"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide Translation' : 'Show Translation'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

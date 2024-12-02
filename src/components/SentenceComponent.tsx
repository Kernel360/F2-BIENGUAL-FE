import { useState } from 'react';

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
    <Card className="w-[798px] h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-xl rounded-lg">
      <CardContent className="p-8 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              다른 사람들이 저장한 문장
            </h3>
            <div key={data.contentId}>
              <p className="text-lg text-white mb-4">{data.enDetail}</p>
              {showTranslation && (
                <p className="text-lg text-gray-200">{data.koDetail}</p>
              )}
            </div>
          </div>
          {/* 문장이 있는 해당 페이지로 가는 <a/> tag */}
          {/* <div className="text-right">
            <a
              href={`/content/${data.english}`}
              className="text-sm text-blue-300 underline"
            >
              Go to Page
            </a>
          </div> */}
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

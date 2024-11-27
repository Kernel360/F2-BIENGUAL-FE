import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { Heart } from 'lucide-react';

import { LevelType } from '@/types/Level';

export default function DifficultyDisplay({
  calculatedLevel,
}: {
  calculatedLevel: LevelType;
}) {
  const getHeartCount = (level: LevelType) => {
    if (level === 'LOW') return 1;
    if (level === 'MEDIUM') return 2;
    return 3;
  };

  return (
    <div className="flex h-full w-full items-center justify-start">
      {calculatedLevel ? (
        <div className="flex items-center justify-start w-full ">
          <span className="flex items-center justify-center text-center p-1 rounded">
            {Array.from({ length: getHeartCount(calculatedLevel) }).map(
              (_, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <Heart key={index} fill="#7641ed" />
              ),
            )}
          </span>
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-auto h-full">
          <div className="flex items-center justify-center p-1 px-2 gap-1 text-sm text-white bg-violet-500/30 rounded">
            LEVEL
            <QuestionMarkCircledIcon />
          </div>
          {/* <QuestionMarkCircledIcon
            className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            stroke="#7641ED"
          /> */}
        </div>
      )}
    </div>
  );
}

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

import { LevelType } from '@/types/Level';

export default function DifficultyDisplay({
  calculatedLevel,
}: {
  calculatedLevel: LevelType;
}) {
  const getHeartCount = (level: LevelType) => {
    if (level === 'LOW') return '🍀EASY';
    if (level === 'MEDIUM') return '🌟MEDIUM';
    return '🔥HARD';
  };

  const getBackgroundColor = (level: LevelType) => {
    if (level === 'LOW') return 'bg-green-500/70';
    if (level === 'MEDIUM') return 'bg-yellow-500/70';
    return 'bg-red-500/70';
  };

  return (
    <div className="flex h-full w-full items-center justify-start">
      <div className="relative flex items-center justify-center w-auto h-full">
        {!calculatedLevel ? (
          <div
            className={`flex items-center justify-center p-1 px-2 mx-1 gap-1 text-xs font-semibold font-mono text-white ${getBackgroundColor(calculatedLevel)} backdrop-blur-sm rounded`}
          >
            <span>{getHeartCount(calculatedLevel)}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center  p-1 px-2 mx-1 gap-1 text-xs font-semibold font-mono text-white bg-violet-500/70  backdrop-blur-sm rounded">
            LEVEL
            <QuestionMarkCircledIcon />
          </div>
        )}
      </div>
    </div>
  );
}

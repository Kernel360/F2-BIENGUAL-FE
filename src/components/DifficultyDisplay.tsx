import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

import { LevelType } from '@/types/Level';

export default function DifficultyDisplay({
  calculatedLevel,
}: {
  calculatedLevel: LevelType;
}) {
  const getLevelText = (level: LevelType) => {
    switch (level) {
      case 'HIGH':
        return { text: 'HIGH', color: 'text-red-500' };
      case 'MEDIUM':
        return { text: 'MEDIUM', color: 'text-yellow-500' };
      case 'LOW':
        return { text: 'LOW', color: 'text-green-500' };
      default:
        return { text: '', color: '' };
    }
  };

  return (
    <div className="flex items-center justify-start h-full w-full">
      {calculatedLevel ? (
        <div className="flex items-center gap-1">
          <span className={`text-sm ${getLevelText(calculatedLevel).color}`}>
            {getLevelText(calculatedLevel).text}
          </span>
          <span className="text-sm text-violet-700">{calculatedLevel}</span>
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

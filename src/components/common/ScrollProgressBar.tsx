import { Progress } from '@/components/ui/progress';

interface ScrollProgressBarProps {
  scrollPercent: number;
}

export default function ScrollProgressBar({
  scrollPercent,
}: ScrollProgressBarProps) {
  return (
    <div className="top-[64px] left-0 w-full fixed">
      <Progress
        value={scrollPercent}
        className="h-1 bg-violet-100 rounded-none"
      />
    </div>
  );
}

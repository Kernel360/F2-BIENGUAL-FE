import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';

export default function ScrollProgressBar() {
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercents = (scrollTop / docHeight) * 100;
    setScrollPercent(scrollPercents);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="top-[64px] left-0 w-full  fixed 
    "
    >
      <Progress
        value={scrollPercent}
        className="h-1 bg-violet-100  rounded-none "
      />
    </div>
  );
}

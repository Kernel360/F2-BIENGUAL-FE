'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CarouselProps<T> {
  header?: ReactNode;
  itemComponent: ({
    data,
    onNext,
  }: {
    data: T;
    onNext?: () => void;
  }) => JSX.Element;
  previewDatas: T[];
  itemWidth: number;
  isAutoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel<T>({
  header,
  itemComponent,
  previewDatas,
  itemWidth,
  isAutoPlay = false,
  autoPlayInterval = 4000,
}: CarouselProps<T>) {
  const ItemComponent = itemComponent;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const gap = 16; // 아이템 간 간격 (px)
  const totalItems = previewDatas.length;

  const moveToSlide = (index: number) => {
    if (isTransitioning) return; // 이동 중일 경우 중복 호출 방지
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    moveToSlide((currentIndex + 1) % (totalItems - 2));
  };

  const prevSlide = () => {
    moveToSlide((currentIndex - 1 + (totalItems - 2)) % (totalItems - 2));
  };

  useEffect(() => {
    if (carouselRef.current) {
      const totalItemWidth = itemWidth + gap;
      carouselRef.current.style.transition = isTransitioning
        ? 'transform 300ms ease-in-out'
        : 'none';
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * totalItemWidth
      }px)`;
    }
  }, [currentIndex, itemWidth, gap, isTransitioning]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex, itemWidth, gap]);

  useEffect(() => {
    if (isAutoPlay && intervalRef.current === null) {
      const intervalId = setInterval(nextSlide, autoPlayInterval);
      intervalRef.current = intervalId;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlay, nextSlide]); // nextSlide가 의존성배열에 들어가야 캐러셀 옮겨도 autoPlay정상작동

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <div className="w-full px-4" style={{ minWidth: 0 }}>
      {header && <div className="w-full">{header}</div>}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-1000 ease-in-out gap-4"
        >
          {previewDatas.map((data, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="shrink-0"
              style={{
                width: `${itemWidth}px`,
              }}
            >
              <ItemComponent data={data} onNext={nextSlide} />
            </div>
          ))}
        </div>

        {showButtons && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

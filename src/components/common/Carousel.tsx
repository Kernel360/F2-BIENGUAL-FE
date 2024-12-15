'use client';

import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

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
  items: T[];
  desktopItemsToShow: number;
  tabletItemsToShow: number;
  mobileItemsToShow: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel<T>({
  header,
  itemComponent: ItemComponent,
  items,
  desktopItemsToShow,
  tabletItemsToShow,
  mobileItemsToShow,
  autoPlay = false,
  autoPlayInterval = 4000,
}: CarouselProps<T>): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(desktopItemsToShow);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const totalItems = items.length;

  const moveToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
    },
    [isTransitioning],
  );

  const nextSlide = useCallback(() => {
    moveToSlide((currentIndex + 1) % totalItems);
  }, [currentIndex, moveToSlide, totalItems]);

  const prevSlide = () => {
    moveToSlide((currentIndex - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    if (
      !isTransitioning &&
      carouselRef.current &&
      itemsRef.current[currentIndex]
    ) {
      const scrollPosition = itemsRef.current[currentIndex]?.offsetLeft || 0;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(intervalId);
    }
  }, [autoPlay, autoPlayInterval, nextSlide]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(desktopItemsToShow);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(tabletItemsToShow);
      } else {
        setItemsToShow(mobileItemsToShow);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [desktopItemsToShow, tabletItemsToShow, mobileItemsToShow]);

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
    <div className="w-full px-4">
      {header && <div className="w-full">{header}</div>}
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="shrink-0"
              style={{
                width: `calc(${100 / itemsToShow}% - ${((itemsToShow - 1) * 16) / itemsToShow}px)`,
              }}
            >
              <ItemComponent data={item} onNext={nextSlide} />
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white"
          onClick={prevSlide}
          aria-label="이전 슬라이드드"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white"
          onClick={nextSlide}
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

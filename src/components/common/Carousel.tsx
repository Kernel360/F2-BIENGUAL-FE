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
}

export default function Carousel<T>({
  header,
  itemComponent,
  previewDatas,
  itemWidth,
}: CarouselProps<T>) {
  const ItemComponent = itemComponent;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = previewDatas.length;
  const maxIndex = totalItems - 1;

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  const prevSlide = () =>
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex, itemWidth]);

  return (
    <div className="w-full px-6" style={{ minWidth: 0 }}>
      {header && <div className="w-full">{header}</div>}

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: 'fit-content' }}
        >
          {previewDatas.map((data, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="shrink-0"
              style={{ width: `${itemWidth}px` }}
            >
              <ItemComponent data={data} onNext={nextSlide} />
            </div>
          ))}
        </div>

        {showButtons && currentIndex > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {showButtons && currentIndex < maxIndex && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}

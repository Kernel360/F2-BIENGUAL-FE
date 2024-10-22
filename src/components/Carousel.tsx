'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef, useEffect, ReactNode } from 'react';

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
  previewDatas: T[]; // TODO(@smosco): data 타입 정의
  itemWidth: number;
  itemsPerPage: number;
}

// const DEFAULT_ITEM_WIDTH = 300;
// const DEFAULT_ITEMS_PER_PAGE = 3;

export default function Carousel<T>({
  header,
  itemComponent,
  previewDatas,
  itemWidth,
  itemsPerPage,
}: CarouselProps<T>) {
  // 리액트가 컴포넌트로 인지하도록 대문자로 시작하도록 변경
  const ItemComponent = itemComponent;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalItems = previewDatas.length;
  const maxIndex = totalItems - itemsPerPage;

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
    <div className="relative w-full mx-auto">
      {/* Carousel Header */}
      {header && header}

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Carousel Items */}
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${totalItems * itemWidth}px` }}
        >
          {/* TODO(@smosco): 유니언 타입으로 인한 타입 단언 수정 */}
          {previewDatas.map((data, index) => {
            return (
              <ItemComponent
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                data={data}
                onNext={nextSlide}
              />
            );
          })}
        </div>

        {/* Previous Button */}
        {showButtons && currentIndex > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 transform -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Next Button */}
        {showButtons && currentIndex < maxIndex && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}

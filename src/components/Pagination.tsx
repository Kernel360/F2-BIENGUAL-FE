'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageRange = 10;
  const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageClick(startPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageClick(endPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 pb-28 pt-12">
      {startPage > 1 && (
        <button
          type="button"
          onClick={handlePrevClick}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" color="gray" />
        </button>
      )}
      {Array.from(
        // 길이가 endPage - startPage + 1 인 배열 생성
        { length: endPage - startPage + 1 },
        // 배열의 요소는 startPage 에 index 를 더한 값을 가짐
        (_, index) => startPage + index,
      ).map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => handlePageClick(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${
            currentPage === page
              ? 'bg-purple-50 text-purple-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          type="button"
          onClick={handleNextClick}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" color="gray" />
        </button>
      )}
    </div>
  );
}

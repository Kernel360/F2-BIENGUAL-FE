import React, { useState, useRef, useEffect } from 'react';

import { useQuizStore } from '@/stores/quizStore';

import Quiz from './Quiz';

export default function QuizCarousel() {
  const { questions } = useQuizStore();
  const [retryMode, setRetryMode] = useState(false);
  // TODO(@smosco): 현재 렌더링 할때마다 filter를 해오기 때문에 맞추는 순간 questions의 총 개수가 줄어드는 문제가 있음
  const currentQuestions = retryMode
    ? questions.filter((question) => !question.isCorrect)
    : questions;

  const totalQuestions = currentQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const correctQuestionCount = questions.filter(
    (question) => question.isCorrect,
  ).length;

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 790}px)`;
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setRetryMode(true);
  };

  return (
    <div>
      {/* 퀴즈 진행 상태 표시 */}
      <p>
        {currentIndex === totalQuestions
          ? '결과 보기'
          : `${currentIndex + 1} / ${totalQuestions} 문제`}
      </p>

      <div className="w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: '100%' }}
        >
          {currentQuestions.map((data, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="shrink-0"
              style={{ width: `${783}px` }}
            >
              <Quiz data={data} onNext={handleNext} />
            </div>
          ))}
          <div style={{ width: `${783}px` }}>
            결과 페이지 맞은 개수
            {`${correctQuestionCount} / ${questions.length}`}
            <button type="button" onClick={handleRetry}>
              다시 풀기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

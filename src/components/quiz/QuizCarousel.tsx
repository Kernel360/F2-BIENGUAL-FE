/* eslint-disable no-nested-ternary */

'use client';

import React, { useState, useRef, useEffect } from 'react';

import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DomainEvent, State } from '@/lib/quizReducer';

import Quiz from './Quiz';

export default function QuizCarousel({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<DomainEvent>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalQuestions = state.questions.length;
  const carouselRef = useRef<HTMLDivElement>(null);

  const correctQuestionCount = state.questions.filter(
    (question) => question.status === 'correct',
  ).length;

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * (100 / (totalQuestions + 1))}%)`;
    }
  }, [currentIndex, totalQuestions]);

  const handleNext = () => {
    if (currentIndex < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);

    const event: DomainEvent = {
      type: 'end_quiz',
    };
    dispatch(event);
  };

  const score = Math.round(
    (correctQuestionCount / state.questions.length) * 100,
  );

  return (
    <Card className="w-full mx-auto ">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-bold">
          {currentIndex === totalQuestions ? '퀴즈 결과' : '퀴즈'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {currentIndex !== totalQuestions && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              {/* TODO(@smosco): 다시 풀기 중인지 표시 */}
              <span className="text-sm font-medium">진행 상황</span>
              <span className="text-sm font-medium">
                {currentIndex + 1} / {totalQuestions}
              </span>
            </div>
            <Progress value={((currentIndex + 1) / totalQuestions) * 100} />
          </div>
        )}

        <div className="w-full overflow-hidden relative">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: `${(totalQuestions + 1) * 100}%`, // 전체 슬라이드 너비
              transform: `translateX(-${currentIndex * (100 / (totalQuestions + 1))}%)`, // 이동
            }}
          >
            {state.questions.length > 0 &&
              state.questions.map((question) => (
                <Quiz
                  key={question.questionId}
                  question={question}
                  dispatch={dispatch} // dispatch를 전달
                  onNext={handleNext}
                />
              ))}
            <div
              className="flex-shrink-0 w-full"
              style={{ width: `${100 / (totalQuestions + 1)}%` }} // 결과 페이지 너비
            >
              <div className="text-center">
                <div className="mb-6">
                  {score >= 80 ? (
                    <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
                  ) : score >= 50 ? (
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                  ) : (
                    <XCircle className="w-16 h-16 mx-auto text-red-500" />
                  )}
                </div>
                <h2 className="text-lg font-bold mb-4">
                  {score >= 80
                    ? '축하합니다!'
                    : score >= 50
                      ? '좋은 성과예요!'
                      : '아쉽네요. 다시 도전해보세요!'}
                </h2>
                <p className="text-lg mb-6">
                  총 {state.questions.length}문제 중 {correctQuestionCount}
                  문제를 맞췄어요
                </p>
                <div className="flex justify-center items-center space-x-4 mb-8">
                  <div className="font-bold">{score}%</div>
                  <Progress value={score} className="w-64" />
                </div>
                <div className="space-y-4">
                  <p>
                    {score >= 80
                      ? '훌륭해요! 당신의 지식이 빛나고 있어요'
                      : score >= 50
                        ? '좋은 시도였어요. 조금만 더 노력하면 더 좋은 결과를 얻을 수 있을 거예요.'
                        : '걱정하지 마세요. 학습은 계속되는 과정이에요. 다시 도전해보세요!'}
                  </p>
                  <Button onClick={handleRetry} className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    다시 도전하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* eslint-disable no-nested-ternary */

'use client';

import React, { useReducer, useState, useEffect } from 'react';

import { useFetchQuiz } from '@/api/hooks/useQuiz';
import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import Modal from '@/components/common/Modal';
import QuizCarousel from '@/components/quiz/QuizCarousel';
import QuizCover from '@/components/quiz/QuizCover';
import { Button } from '@/components/ui/button';
import { quizReducer, DomainEvent, State } from '@/lib/quizReducer';

import LogInOutButton from '../common/LogInOutButton';

const initialState: State = {
  questions: [],
};

export default function QuizWrapper({ contentId }: { contentId: number }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data;

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    data: quizData,
    isLoading: isQuizLoading,
    refetch: fetchQuiz,
  } = useFetchQuiz(contentId, false);

  useEffect(() => {
    if (showQuiz && isLogin) {
      fetchQuiz();
    }
  }, [showQuiz, isLogin, fetchQuiz]);

  useEffect(() => {
    if (quizData) {
      const event: DomainEvent = {
        type: 'download_quiz',
        questions: quizData.data.questionAnswer,
      };
      dispatch(event);
    }
  }, [quizData]);

  const handleStartQuiz = async () => {
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }

    setShowQuiz(true);
    await fetchQuiz();
  };

  const quizQuestions = state.questions;

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      {!showQuiz ? (
        <QuizCover
          startColor={isLogin ? 'from-blue-400' : 'from-gray-300'}
          endColor={isLogin ? 'to-purple-600' : 'to-purple-500'}
          text={
            isLogin
              ? `방금 학습한 내용, 확실히 기억하고 있나요?\n퀴즈로 점검해보세요!`
              : '퀴즈를 풀려면 로그인이 필요해요!'
          }
          textColor="text-white"
          button={
            <Button
              onClick={handleStartQuiz}
              className={`${
                isLogin
                  ? 'bg-white text-blue-600 hover:bg-blue-100'
                  : 'bg-white text-violet-700 hover:bg-violet-100'
              } transition-colors duration-200`}
            >
              {isLogin ? '퀴즈 풀기' : '로그인'}
            </Button>
          }
        />
      ) : (
        <div className="relative bg-white">
          {isQuizLoading ? (
            <QuizCover
              startColor="white"
              endColor="to-purple-200"
              text="퀴즈를 로딩 중이에요"
              textColor="text-gray-700"
            />
          ) : quizQuestions.length === 0 ? (
            <QuizCover
              startColor="white"
              endColor="to-purple-200"
              text={`퀴즈를 준비중이에요!\n관리자에게 문의해주세요.`}
              textColor="text-gray-700"
            />
          ) : (
            <QuizCarousel state={state} dispatch={dispatch} />
          )}
        </div>
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="로그인이 필요해요"
          description="이 기능을 이용하려면 로그인이 필요해요!"
        >
          <div className="flex justify-center gap-4 mt-4">
            <LogInOutButton />
          </div>
        </Modal>
      )}
    </div>
  );
}

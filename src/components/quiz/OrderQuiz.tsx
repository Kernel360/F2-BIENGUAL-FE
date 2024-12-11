'use client';

import { useState } from 'react';

import { LightbulbIcon } from 'lucide-react';

import { useFetchCurrentPoints } from '@/api/hooks/useDashboard';
import {
  useFetchMissionStatus,
  useUpdateMissionStatus,
} from '@/api/hooks/useMission';
import { useCheckQuestionAnswer, useViewHint } from '@/api/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { QuestionState, DomainEvent } from '@/lib/quizReducer';
import { cn } from '@/lib/utils';

import Modal from '../common/Modal';

interface OrderQuizProps {
  question: QuestionState;
  dispatch: React.Dispatch<DomainEvent>;
  onNext?: () => void;
}

export default function OrderQuiz({
  question,
  dispatch,
  onNext,
}: OrderQuizProps) {
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const { mutate: checkAnswer } = useCheckQuestionAnswer();
  const { data: missionStatus } = useFetchMissionStatus();
  const { mutate: updateMissionStatus } = useUpdateMissionStatus();
  const viewHintMutation = useViewHint();
  const [hint, setHint] = useState('');
  const [showPointModal, setShowPointModal] = useState(false);
  const [showPointErrorModal, setShowPointErrorModal] = useState(false);
  const { data: pointsData } = useFetchCurrentPoints();
  const userPoints = pointsData?.data.currentPoint || 0;
  const requiredPoints = 5;
  const { toast } = useToast();

  const handleSubmitAnswer = (questionId: string, answer: string) => {
    dispatch({ type: 'submit_answer', questionId, answer });
  };

  const handleAnswerResponse = (questionId: string, ok: boolean) => {
    dispatch({ type: 'response_question_result', questionId, ok });
  };

  const handleHintRequest = () => {
    if (userPoints < requiredPoints) {
      setShowPointErrorModal(true);
    } else {
      setShowPointModal(true);
    }
  };

  const handleHintConfirm = async () => {
    try {
      const success = await viewHintMutation.mutateAsync(question.questionId);
      if (success) {
        setHint(success.data.hint);
        toast({
          description: `${requiredPoints} 포인트가 차감되었어요`,
        });
      }
    } catch (error) {
      toast({ title: '힌트를 불러오지 못했어요', duration: 1000 });
    } finally {
      setShowPointModal(false);
    }
  };

  const handleSelect = (index: number) => {
    if (question.status !== 'ready') return;

    setSelectedOrder((prev) => {
      const newOrder = [...prev];
      const existingIndex = newOrder.indexOf(index);

      if (existingIndex !== -1) {
        newOrder.splice(existingIndex, 1);
      } else if (newOrder.length < 4) {
        newOrder.push(index);
      }

      return newOrder;
    });
  };

  const handleSubmit = async () => {
    if (selectedOrder.length !== 4) return;

    const userAnswer = selectedOrder.join(' ');
    handleSubmitAnswer(question.questionId, userAnswer);

    checkAnswer(
      { questionId: question.questionId, answer: userAnswer },
      {
        onSuccess: (response) => {
          const ok = response.data;
          handleAnswerResponse(question.questionId, ok);

          if (ok) toast({ description: '5 포인트 획득!' });
          if (!missionStatus?.data.quiz) {
            updateMissionStatus({ quiz: true });
          }
        },
        onError: () => {
          handleAnswerResponse(question.questionId, false);
        },
      },
    );
  };

  const handleNext = () => {
    if (onNext) onNext();
    setSelectedOrder([]);
  };

  return (
    <div className="w-full">
      <CardHeader className="space-y-4 text-center">
        <CardTitle className="text-xl font-medium leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 힌트 */}
        <div className="flex justify-center mt-4">
          {hint ? (
            <div className="w-full p-4 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-purple-900 text-sm">
                <span className="font-semibold">힌트:</span> {hint}
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={handleHintRequest}
              className="gap-2 text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
            >
              <LightbulbIcon className="w-4 h-4" />
              힌트 보기 ({requiredPoints}P)
            </Button>
          )}
        </div>

        {/* 선택한 순서 */}
        <div className="flex justify-center gap-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all',
                selectedOrder[index] !== undefined
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-gray-100 text-gray-400 border-2 border-dashed border-gray-200',
              )}
            >
              {selectedOrder[index] !== undefined
                ? selectedOrder[index] + 1
                : ''}
            </div>
          ))}
        </div>

        {/* 선택 옵션 */}
        <div className="grid gap-3">
          {question.examples.map((option, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => handleSelect(index)}
              disabled={question.status !== 'ready'}
              className={cn(
                'w-full p-4 rounded-lg text-left transition-all',
                'border-2 hover:border-purple-200',
                question.status === 'ready' && 'hover:bg-purple-50',
                selectedOrder.includes(index) &&
                  'border-purple-300 bg-purple-50 shadow-sm',
                question.status === 'correct' &&
                  selectedOrder.includes(index) &&
                  'bg-green-50 border-green-300 text-green-700',
                question.status === 'wrong' &&
                  'bg-red-50 border-red-200 text-red-700',
                question.status !== 'ready' && 'cursor-not-allowed',
              )}
            >
              <span className="block text-sm md:text-base">{option}</span>
            </button>
          ))}
        </div>

        {/* 결과 메세지 */}
        {question.status !== 'ready' && question.status !== 'submitting' && (
          <div
            className={cn(
              'text-center font-medium p-3 rounded-lg',
              question.status === 'correct'
                ? 'bg-green-50 text-green-600'
                : 'bg-red-50 text-red-600',
            )}
          >
            {question.status === 'correct' ? '정답입니다! 🎉' : '오답입니다 😢'}
          </div>
        )}

        {/* 제출 */}
        {/* <div className="pt-4"> */}
        {question.status === 'ready' ? (
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={selectedOrder.length !== 4}
          >
            정답 제출하기
          </Button>
        ) : (
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={handleNext}
          >
            다음 문제
          </Button>
        )}
        {/* </div> */}
      </CardContent>

      {/* 힌트 포인트 모달 */}
      {showPointErrorModal && (
        <Modal
          isOpen={showPointErrorModal}
          onClose={() => setShowPointErrorModal(false)}
          title="포인트가 부족해요"
          description={`현재 포인트: ${userPoints}P / 필요 포인트: ${requiredPoints}P`}
        >
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              퀴즈를 풀어서 포인트를 모아보세요! 😊
            </p>
            <Button
              variant="outline"
              onClick={() => setShowPointErrorModal(false)}
              className="w-full"
            >
              확인
            </Button>
          </div>
        </Modal>
      )}

      {showPointModal && (
        <Modal
          isOpen={showPointModal}
          onClose={() => setShowPointModal(false)}
          title="힌트 보기"
          description={`${requiredPoints}P를 사용하시겠습니까?`}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              현재 포인트: {userPoints}P → 차감 후:
              {userPoints - requiredPoints}P
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPointModal(false)}
                className="flex-1"
              >
                취소
              </Button>
              <Button onClick={handleHintConfirm} className="flex-1">
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

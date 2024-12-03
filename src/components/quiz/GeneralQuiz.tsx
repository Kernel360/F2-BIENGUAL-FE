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
import { useToast } from '@/hooks/use-toast';
import { QuestionState, DomainEvent } from '@/lib/quizReducer';
import { cn } from '@/lib/utils';

import Modal from '../common/Modal';

interface GeneralQuizProps {
  question: QuestionState;
  dispatch: React.Dispatch<DomainEvent>;
  onNext?: () => void;
}

export default function GeneralQuiz({
  question,
  dispatch,
  onNext,
}: GeneralQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const { mutate: checkAnswer } = useCheckQuestionAnswer();

  const { data: missionStatus } = useFetchMissionStatus();
  const { mutate: updateMissionStatus } = useUpdateMissionStatus();

  const viewHintMutation = useViewHint();

  const [hint, setHint] = useState('');

  const [showPointModal, setShowPointModal] = useState(false);
  const [showPointErrorModal, setShowPointErrorModal] = useState(false);

  const { data: pointsData } = useFetchCurrentPoints();
  const userPoints = pointsData?.data.currentPoint || 0;
  const requiredPoints = 5; // 항상 5 포인트 차감

  const { toast } = useToast();

  const handleSubmitAnswer = (questionId: string, answer: number) => {
    const event: DomainEvent = {
      type: 'submit_answer',
      questionId,
      answer,
    };
    dispatch(event);
  };

  const handleAnswerResponse = (questionId: string, ok: boolean) => {
    const event: DomainEvent = {
      type: 'response_question_result',
      questionId,
      ok,
    };
    dispatch(event);
  };

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    handleSubmitAnswer(question.questionId, answer);

    checkAnswer(
      { questionId: question.questionId, answer: `${answer}` },
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

  const handleHintRequest = () => {
    if (userPoints < requiredPoints) {
      setShowPointErrorModal(true);
    } else {
      setShowPointModal(true);
    }
  };

  const handleConfirm = async () => {
    try {
      const success = await viewHintMutation.mutateAsync(question.questionId);
      if (success) {
        setHint(success.data.hint);
        toast({
          description: `${requiredPoints} 포인트가 차감되었습니다.`,
        });
      }
    } catch (error) {
      toast({ title: '힌트를 불러오지 못했습니다.', duration: 1000 });
    } finally {
      setShowPointModal(false);
    }
  };

  const handleNext = () => {
    if (onNext) onNext();
    setSelectedAnswer(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="text-lg font-medium">{question.question}</div>
      </div>
      <div className="space-y-4">
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

        {/* 선택지 */}
        <div className="grid gap-3">
          {question.examples.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = isSelected && question.status === 'correct';
            const isWrongAnswer = isSelected && question.status === 'wrong';

            return (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                type="button"
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  'w-full p-4 rounded-lg text-left transition-all',
                  'border-2 hover:border-purple-200',
                  isCorrectAnswer &&
                    'bg-green-50 border-green-300 text-green-700',
                  isWrongAnswer && 'bg-red-50 border-red-200 text-red-700',
                  !isSelected &&
                    question.status === 'ready' &&
                    'hover:bg-purple-50',
                  question.status !== 'ready' && 'cursor-not-allowed',
                )}
                disabled={question.status !== 'ready'}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* 결과 메세지 */}
        {question.status !== 'ready' && question.status !== 'submitting' && (
          <div
            className={cn(
              'text-center font-medium mt-4 p-3 rounded-md',
              question.status === 'correct'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
            )}
          >
            {question.status === 'correct' ? '정답입니다! 🎉' : '오답입니다 😢'}
          </div>
        )}

        {/* 다음 문제 넘어가기 */}
        {question.status !== 'ready' && question.status !== 'submitting' && (
          <Button
            className="w-full mt-6"
            onClick={handleNext}
            variant="default"
          >
            다음 문제
          </Button>
        )}
      </div>

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
              <Button onClick={handleConfirm} className="flex-1">
                확인
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

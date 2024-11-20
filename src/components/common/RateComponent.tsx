import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useCreateContentsFeedback } from '@/api/hooks/useContent';
import { toast } from '@/hooks/use-toast';
import Modal from './Modal';

export default function RateComponent({ contentId }: { contentId: number }) {
  const CreateContentsFeedbackMutation = useCreateContentsFeedback(contentId);
  const [clickedButton, setClickedButton] = useState<
    'LOW' | 'MEDIUM' | 'HIGH' | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [contentLevel, setContentLevel] = useState<
    'LOW' | 'MEDIUM' | 'HIGH' | null
  >(null);

  const handleSubmitRate = async ({
    contentLevel,
  }: {
    contentLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  }) => {
    CreateContentsFeedbackMutation.mutate(contentLevel, {
      onSuccess: () => {
        setSuccess(true);
        setLoading(false);
      },
      onError: (error) => {
        setError(error as unknown as string);
        console.log(error as unknown as string);
        toast({ description: '평가를 제출하지 못했어요' });
        setLoading(false);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col justify-start gap-3 p-4 border rounded">
        <h2 className="text-lg font-bold">컨텐츠 난이도 평가</h2>
        <h4 className="text-md font-medium">
          이 컨텐츠를 학습하면서 얼마나 어려웠나요?
        </h4>
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-10 p-4">
            <Button
              type="button"
              variant="outline"
              className={`hover:bg-violet-200 ${clickedButton === 'HIGH' && 'bg-violet-300 text-white'}`}
              onClick={() => {
                setClickedButton('HIGH');
                setContentLevel('HIGH');
              }}
              disabled={loading}
            >
              상
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`hover:bg-violet-200 ${clickedButton === 'MEDIUM' && 'bg-violet-300  text-white'}`}
              onClick={() => {
                setClickedButton('MEDIUM');
                setContentLevel('MEDIUM');
              }}
              disabled={loading}
            >
              중
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`hover:bg-violet-200 ${clickedButton === 'LOW' && 'bg-primary  text-white'}`}
              onClick={() => {
                setClickedButton('LOW');
                setContentLevel('LOW');
              }}
              disabled={loading}
            >
              하
            </Button>
          </div>
          {clickedButton && !success && (
            <Button
              type="button"
              variant="default"
              className="flex justify-center items-center"
              onClick={() => {
                if (contentLevel) {
                  handleSubmitRate({
                    contentLevel,
                  });
                }
              }}
            >
              평가 등록하기
            </Button>
          )}
          {!loading && !error && success && (
            // api 보내고 난 후에 다시 refetch해왔을 때 myrate가 있으면 이 버튼으로 바꿔주기
            <Button
              type="button"
              variant="outline"
              className="flex justify-center items-center"
              onClick={() => {
                if (contentLevel) {
                  handleSubmitRate({
                    contentLevel,
                  });
                }
              }}
            >
              평가 등록이 완료되었어요
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

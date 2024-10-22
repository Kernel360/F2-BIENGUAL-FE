import React, { useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';

interface BlankQuizProps {
  questionKo: string;
  question: string;
  answer: string;
  onSubmit: (isCorrect: boolean) => void;
}

export function BlankQuiz({
  questionKo,
  question,
  answer,
  onSubmit,
}: BlankQuizProps) {
  const [userInput, setUserInput] = useState('');

  const questionParts = question.split('____');

  const handleClickSubmit = useCallback(() => {
    const isCorrect =
      userInput.trim().toLocaleLowerCase() === answer.toLowerCase();
    onSubmit(isCorrect);
  }, [userInput, answer, onSubmit]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <p>{questionKo}</p>
      <div className="inline whitespace-pre-wrap">
        <span>{questionParts[0]}</span>

        <input
          type="text"
          className="bg-violet-100 rounded-sm inline-block text-center py-1 outline-none text-primary mx-1"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{ width: `${answer.length * 20}px` }}
        />

        <span>{questionParts[1]}</span>
      </div>
      <Button className="mt-auto" onClick={handleClickSubmit}>
        제출
      </Button>
    </div>
  );
}

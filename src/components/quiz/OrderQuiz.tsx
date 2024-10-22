import { useState, useEffect, useCallback } from 'react';

import { Button } from '../ui/button';

interface OrderQuizProps {
  questionKo: string;
  question: string;
  answer: string;
  onSubmit: (isCorrect: boolean) => void;
}

export default function OrderQuiz({
  questionKo,
  question,
  answer,
  onSubmit,
}: OrderQuizProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);

  useEffect(() => {
    setSelectedWords([]);
    setRemainingWords(question.split(' '));
  }, [question]);

  const handleClickSelect = useCallback((word: string) => {
    setSelectedWords((prev) => [...prev, word]);
    setRemainingWords((prev) =>
      prev.filter((existingWord) => existingWord !== word),
    );
  }, []);

  const handleClickUnselect = useCallback((word: string) => {
    setRemainingWords((prev) => [...prev, word]);
    setSelectedWords((prev) =>
      prev.filter((existingWord) => existingWord !== word),
    );
  }, []);

  const handleClickSubmit = useCallback(() => {
    const submittedAnswer = selectedWords.join(' ');
    const isCorrect = submittedAnswer === answer;
    onSubmit(isCorrect);
  }, [selectedWords, answer, onSubmit]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <p>{questionKo}</p>
      {/* 선택된 단어 */}
      <div className="flex flex-wrap gap-2 border-b min-h-8">
        {selectedWords.map((word, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => handleClickUnselect(word)}
          >
            {word}
          </Button>
        ))}
      </div>
      {/* 남은 단어 */}
      <div className="flex flex-wrap gap-2">
        {remainingWords.map((word, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleClickSelect(word)}
          >
            {word}
          </Button>
        ))}
      </div>
      <Button className="mt-auto" onClick={handleClickSubmit}>
        제출
      </Button>
    </div>
  );
}

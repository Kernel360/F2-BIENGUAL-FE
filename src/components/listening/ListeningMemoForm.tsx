import { X, Check } from 'lucide-react';

import { Button } from '../ui/button';

// TODO(@smosco): memo 타입이 BookmarkMemoPanel, BookmarkMemoItem에서 약간 달라서 제네릭 사용
interface ListeningMemoFormProps<T extends string | null> {
  isEditing: boolean;
  memo: T;
  setMemo: React.Dispatch<React.SetStateAction<T>>;
  handleCancelEdit: () => void;
  handleSaveMemo: () => void;
}

export default function ListeningMemoForm<T extends string | null>({
  isEditing,
  memo,
  setMemo,
  handleCancelEdit,
  handleSaveMemo,
}: ListeningMemoFormProps<T>) {
  return (
    <div
      className={`flex flex-col pl-4 border-l-2 ${isEditing ? 'border-purple-700' : 'border-gray-300'}`}
    >
      <textarea
        value={memo || ''}
        onChange={(e) => setMemo(e.target.value as T)}
        placeholder="메모를 입력해주세요."
        className="min-h-5 w-[170px] border-none outline-none p-0 mr-6 bg-transparent text-[14px] font-[500]"
      />
      {isEditing && (
        <div className="flex justify-end space-x-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              handleCancelEdit();
              e.stopPropagation();
            }}
          >
            <X className="h-4 w-4 mr-2" /> 취소
          </Button>
          <Button
            onClick={(e) => {
              handleSaveMemo();
              e.stopPropagation();
            }}
            size="sm"
          >
            <Check className="h-4 w-4 mr-2" /> 저장
          </Button>
        </div>
      )}
    </div>
  );
}

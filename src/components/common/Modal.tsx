/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  // 모달 배경 클릭 시 모달 닫기
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // 클릭한 위치가 모달 컨텐츠 내부가 아닐 때만 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {description && <p className="mt-4 text-gray-600">{description}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

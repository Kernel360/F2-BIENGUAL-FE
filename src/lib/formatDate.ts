export const formatFullDateWithPad = (
  createdAt: string,
  operation: string = '.',
) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (operation === '.') {
    return `${year}. ${month}. ${day}.`;
  }
  if (operation === '-') {
    return `${year}-${month}-${day}`;
  }
  return '';
};

export const getFormattedDate = (type: 'date' | 'month'): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  if (type === 'date') {
    return `${year}-${month}-${day}`; // 예: 2024-11-18
  }
  if (type === 'month') {
    return `${year}-${month}`; // 예: 2024-11
  }

  return '';
};

export const formatDateToMonthDay = (dateString: string): string => {
  const [, month, day] = dateString.split('-');
  return `${parseInt(month, 10)}.${parseInt(day, 10)}`;
};

// 날짜 포맷팅
export const formatDateToMonthDayWithAdjustNumber = (
  dateStr: string,
  adjustNumber?: number,
) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate() + (adjustNumber || 0)}`;
};

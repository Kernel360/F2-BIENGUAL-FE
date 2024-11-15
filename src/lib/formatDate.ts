export const formatFullDateWithPad = (createdAt: string) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}. ${month}. ${day}.`;
};

export const getCurrentMonthWithPad = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  return `${year}-${month}`;
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

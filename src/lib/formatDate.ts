const convertStringToDate = (stringDate: string) => {
  const DateOfDateType = new Date(stringDate);
  return DateOfDateType;
};

export const formatDate = (createdAt: string) => {
  const date = convertStringToDate(createdAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}. ${month}. ${day}.`;
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

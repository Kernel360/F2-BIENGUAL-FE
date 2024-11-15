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

export const getCurrentMonth = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  return `${year}-${month}`;
};

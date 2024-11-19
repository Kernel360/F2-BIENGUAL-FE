export const formatDate = (
  date: Date | string,
  format:
    | 'YYYY-MM-DD'
    | 'YYYY.MM.DD'
    | 'YYYY-MM'
    | 'MM-DD'
    | 'MM.DD' = 'YYYY-MM-DD',
  adjustDays = 0,
): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  parsedDate.setDate(parsedDate.getDate() + adjustDays);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'YYYY.MM.DD':
      return `${year}. ${month}. ${day}`;
    case 'YYYY-MM':
      return `${year}-${month}`;
    case 'MM-DD':
      return `${month}-${day}`;
    case 'MM.DD':
      return `${month}.${day}`;
    default:
      return '';
  }
};

export const isToday = (date: Date | string): boolean => {
  const today = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  );
};

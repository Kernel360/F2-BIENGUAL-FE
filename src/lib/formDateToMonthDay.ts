export const formatDateToMonthDay = (dateString: string): string => {
  const [, month, day] = dateString.split('-');
  return `${parseInt(month, 10)}.${parseInt(day, 10)}`;
};

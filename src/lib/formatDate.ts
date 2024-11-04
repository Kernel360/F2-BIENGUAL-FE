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

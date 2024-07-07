export const calculateDateAndTimeDiff = (date1: Date, date2: Date) => {
  const diff = date2.getTime() - date1.getTime();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInSeconds = Math.floor(diff / 1000);
  return {
    diffInDays,
    diffInHours,
    diffInMinutes,
    diffInSeconds,
  };
};

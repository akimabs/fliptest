export const formatDate = (dateStr: string, monthType: 'short' | 'long') => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${date.toLocaleString('en-US', {
    month: monthType,
  })} ${date.getFullYear()}`;
};

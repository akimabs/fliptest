export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${date.toLocaleString('en-US', {
    month: 'short',
  })} ${date.getFullYear()}`;
};

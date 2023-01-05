export const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).slice(2);
  return dateString + randomness;
};

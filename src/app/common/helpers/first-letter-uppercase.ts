export const firstLetterUppercase = (value: string = ''): string => {
  value.charAt(0).toUpperCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

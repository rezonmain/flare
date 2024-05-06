const ISONow = (): string => {
  return new Date().toISOString();
};

const expired = (date: string): boolean => {
  return new Date(date) < new Date();
};

export { ISONow, expired };

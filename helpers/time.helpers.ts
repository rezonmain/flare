/**
 * Get the current UTC date in ISO format
 * @returns {string} - Current date in ISO format and UTC timezone
 */
const ISONow = (): string => {
  return new Date().toISOString();
};

const expired = (date: string): boolean => {
  return new Date(date) < new Date();
};

export { ISONow, expired };

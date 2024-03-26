import date from "date-and-time";

export const getCurrentDateTime = (): string => {
  const now = new Date();
  return date.format(now, "'ddd, MMM DD YYYY'");
};

export const formatDate = (inputDate: Date, format: string): string => {
  return date.format(inputDate, format);
};

export const parseDate = (dateString: string, format: string): Date => {
  return date.parse(dateString, format);
};

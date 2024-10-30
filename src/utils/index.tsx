import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
export * from './constants';
export * from './export-to';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export function addSpacesToCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterData<T extends Record<string, any>>(array: T[], filterKeys: string[]) {
  return array.filter(obj => {
    return Object.values(obj).some(key => filterKeys.includes(key));
  });
}

export function formatDate(date?: Date, format: string = 'DD MMM, YYYY'): string {
  let utcFormated = dayjs.utc(date);
  if (!date) return '';
  return dayjs(utcFormated).format(format);
}

export function getDateRangeStateValues(state: string | null) {
  if (!state) {
    return null;
  }
  return new Date(state);
}

import { fromUnixTime } from 'date-fns';

interface DateObject {
  day: string;
  month: string;
  date: string;
  time: string;
}

export function getDateString(date: number): DateObject {
  const stringified = fromUnixTime(date).toString().split(' ');

  return {
    day: stringified[0],
    month: stringified[1],
    date: stringified[2],
    time: stringified[3],
  };
}

export function numberReducer(numArray: number[]): number {
  const reduced = numArray.reduce((total: number, item: number) => {
    return total + item;
  });
  return reduced;
}

import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
  // initialize the value from localStorage
  const [currentValue, setCurrentValue] = useState<string | null>(() =>
    localStorage.getItem(key)
  );

  // update localStorage when the currentValue changes via setCurrentValue
  useEffect(() => {
    localStorage.setItem(key, currentValue!);
  }, [key, currentValue]);

  // use as const to tell TypeScript this is a tuple
  return [currentValue, setCurrentValue] as const;
};

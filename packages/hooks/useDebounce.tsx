import { useEffect, useState } from 'react';

/**
 * Hook pour debouncer une valeur
 * @param value - La valeur à debouncer
 * @param delay - Le délai en millisecondes
 * @returns La valeur debouncée
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

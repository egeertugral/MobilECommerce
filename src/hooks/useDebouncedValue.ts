import { useEffect, useState } from 'react';

//value değiştikten delay ms sonra ancak güncellenen değer döner
export function useDebouncedValue<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // sonraki değişimde önceki timer iptal
  }, [value, delay]);

  return debounced;
}

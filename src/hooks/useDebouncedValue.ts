// Basit debounce hook'u: value her değiştiğinde bekleme süresi (ms) dolana kadar
// setTimeout kurar, süre dolunca debouncedValue güncellenir.
// Örn. kullanıcı yazmayı bırakınca 500ms sonra value "debounced" olur.
import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // value/deps değişirse eski timeout iptal
  }, [value, delay]);

  return debounced;
}

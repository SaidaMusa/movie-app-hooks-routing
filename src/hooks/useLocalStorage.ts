import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue =
        window.localStorage.getItem(key);

      return storedValue
        ? JSON.parse(storedValue)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (
    newValue: T
  ) => {
    setValue(newValue);

    window.localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
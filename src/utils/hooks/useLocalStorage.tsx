import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ SSR safe
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error reading localStorage", err);
    }
  }, [key]);

  // Save whenever value changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error writing localStorage", err);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

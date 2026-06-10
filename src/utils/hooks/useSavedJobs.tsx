"use client";
import { useLocalStorage } from "./useLocalStorage";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useLocalStorage<number[]>("rana-saved-jobs", []);

  const isSaved = (id: number) => savedIds.includes(id);

  const toggle = (id: number) => {
    setSavedIds(
      savedIds.includes(id)
        ? savedIds.filter((i) => i !== id)
        : [...savedIds, id]
    );
  };

  return { savedIds, isSaved, toggle };
}

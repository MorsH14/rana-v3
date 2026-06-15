"use client";
import { useLocalStorage } from "./useLocalStorage";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useLocalStorage<(string | number)[]>("rana-saved-jobs", []);

  const isSaved = (id: string | number) =>
    savedIds.some((saved) => String(saved) === String(id));

  const toggle = (id: string | number) => {
    setSavedIds(
      isSaved(id)
        ? savedIds.filter((i) => String(i) !== String(id))
        : [...savedIds, id]
    );
  };

  return { savedIds, isSaved, toggle };
}

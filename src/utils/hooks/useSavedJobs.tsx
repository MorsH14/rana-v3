"use client";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { getSession } from "@/lib/auth";
import { fetchSavedIds, saveJob, unsaveJob } from "@/lib/saved";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useLocalStorage<string[]>("rana-saved-jobs", []);

  // On mount: sync saved IDs from Supabase into localStorage
  useEffect(() => {
    getSession().then(async (session) => {
      if (!session) return;
      const remote = await fetchSavedIds(session.user.id);
      if (remote.length > 0) {
        setSavedIds((local) => {
          const merged = Array.from(new Set([...local.map(String), ...remote]));
          return merged;
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSaved = (id: string | number) =>
    savedIds.some((saved) => saved === String(id));

  const toggle = async (id: string | number) => {
    const idStr = String(id);
    const willSave = !isSaved(idStr);

    // Optimistic update — instant UI response
    setSavedIds((prev) =>
      willSave ? [...prev, idStr] : prev.filter((s) => s !== idStr)
    );

    // Sync to Supabase in background
    const session = await getSession();
    if (!session) return;
    if (willSave) await saveJob(session.user.id, idStr);
    else await unsaveJob(session.user.id, idStr);
  };

  return { savedIds, isSaved, toggle };
}

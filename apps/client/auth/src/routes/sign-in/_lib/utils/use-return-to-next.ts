import { useEffect } from "react";

// The ?next= URL when it points at this host (another app), else null
const nextUrl = (): URL | null => {
  const next = new URLSearchParams(window.location.search).get("next");
  if (!next) return null;
  try {
    const url = new URL(next);
    return url.hostname === window.location.hostname ? url : null;
  } catch {
    return null;
  }
};

// Sends the shopper back to the app that asked for the sign-in; true while that redirect is under way
export const useReturnToNext = (): boolean => {
  const next = nextUrl()?.href ?? null;
  useEffect(() => {
    if (next) window.location.replace(next);
  }, [next]);
  return next !== null;
};

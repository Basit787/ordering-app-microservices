import type { QueryClient } from "@tanstack/react-query";

// Refreshes several lists in one call: every query whose key starts with one of `keys`.
// (`invalidateQueries({ queryKey: ["a", "b"] })` would only match the single key path a → b.)
export const invalidateKeys = (queryClient: QueryClient, keys: string[]) =>
  queryClient.invalidateQueries({ predicate: (query) => keys.includes(String(query.queryKey[0])) });

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchDashboard } from "./api";

// Suspends until loaded; render inside a SuspenseBoundary / lazyComponent
export const useDashboard = () => useSuspenseQuery({ queryKey: ["dashboard"], queryFn: fetchDashboard });

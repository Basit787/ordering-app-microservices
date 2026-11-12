import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPayments } from "./api";

// Suspends until loaded; render inside a SuspenseBoundary / lazyComponent
export const usePayments = () => useSuspenseQuery({ queryKey: ["admin-payments"], queryFn: fetchPayments });

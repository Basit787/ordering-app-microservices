import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, Toaster, TooltipProvider } from "oamui";
import type { ReactNode } from "react";
import type { AuthClient } from "../auth/client";
import { AuthProvider } from "../auth/react/auth-provider";

type AppProvidersProps = {
  authClient: AuthClient;
  queryClient: QueryClient;
  children: ReactNode;
};

// Providers every web app mounts at its root: theme, React Query, the shared auth session, tooltips, toasts
export const AppProviders = ({ authClient, queryClient, children }: AppProvidersProps) => (
  <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <AuthProvider client={authClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </AuthProvider>
      <Toaster richColors closeButton position="top-right" />
    </QueryClientProvider>
  </ThemeProvider>
);

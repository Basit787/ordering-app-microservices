import { ShieldAlert } from "lucide-react";
import { Button, OamUiEmpty } from "oamui";
import type { ReactNode } from "react";
import { frontendUrl } from "../../lib/service-url";
import { PageSkeleton } from "../../suspense/skeletons";
import type { AuthAccount } from "../../types/auth";
import { LoginScreen, type LoginScreenProps } from "./login-screen";
import { useAuth } from "./use-auth";

type AuthGateProps = LoginScreenProps & {
  children: ReactNode;
  // Only this role sees the app; everyone else gets a no-access screen (the API still enforces it)
  requiredRole?: AuthAccount["role"];
};

// Renders the app only for a signed-in user (with the role, when given); otherwise the shared login screen
export const AuthGate = ({ children, requiredRole, ...loginProps }: AuthGateProps) => {
  const { status, user, client } = useAuth();
  // The saved session is being checked: the page's outline instead of a spinner
  if (status === "loading") return <PageSkeleton />;
  if (status === "signedOut") return <LoginScreen {...loginProps} />;
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background p-6">
        <OamUiEmpty
          icon={<ShieldAlert />}
          title="No access"
          description={`${loginProps.appName ?? "This app"} is only for ${requiredRole}s. You are signed in as ${user?.email}.`}
          action={
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <a href={frontendUrl("auth")}>Go home</a>
              </Button>
              <Button onClick={() => client.signOut()}>Sign in as someone else</Button>
            </div>
          }
        />
      </div>
    );
  }
  return <>{children}</>;
};

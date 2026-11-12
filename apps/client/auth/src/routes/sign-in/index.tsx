import { createFileRoute, Navigate } from "@tanstack/react-router";
import { AuthGate } from "frontend-common";
import { ModeToggle } from "oamui";
import { BrandLogo } from "@/lib/components/brand-logo";
import { useReturnToNext } from "./_lib/utils/use-return-to-next";

export const Route = createFileRoute("/sign-in/")({ component: SignInRoute });

// The shared sign-in / sign-up screen; afterwards back to ?next= (another app) or the landing page
function SignInRoute() {
  return (
    <AuthGate appName="OAM Shop" logo={<BrandLogo />} headerRight={<ModeToggle />}>
      <SignedIn />
    </AuthGate>
  );
}

function SignedIn() {
  const leaving = useReturnToNext();
  return leaving ? null : <Navigate to="/" />;
}

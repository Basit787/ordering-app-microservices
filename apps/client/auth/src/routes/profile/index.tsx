import { createFileRoute } from "@tanstack/react-router";
import { AppHeader, AuthGate, ProfileScreen } from "frontend-common";
import { ModeToggle } from "oamui";
import { BrandLogo } from "@/lib/components/brand-logo";

export const Route = createFileRoute("/profile/")({ component: ProfileRoute });

// The signed-in account (shared by every app), theme and sign out
function ProfileRoute() {
  return (
    <AuthGate appName="OAM Shop" logo={<BrandLogo />} headerRight={<ModeToggle />}>
      <div className="flex min-h-dvh flex-col bg-background">
        <AppHeader page="Profile" />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 md:px-6">
          <ProfileScreen />
        </main>
      </div>
    </AuthGate>
  );
}

import { useAuth } from "frontend-common";
import { APPS } from "../utils/apps";
import { AppCard } from "./app-card";

// Signed-in shortcuts into the apps; the Admin card only for admins
export const Shortcuts = () => {
  const { status, user } = useAuth();
  if (status !== "signedIn") return null;
  const apps = APPS.filter((app) => !app.adminOnly || user?.role === "admin");
  return (
    <section className="mx-auto max-w-6xl space-y-4 px-4 pt-12 md:px-6">
      <h2 className="text-xl font-semibold">Jump back in</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
};

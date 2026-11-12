import { LogOut } from "lucide-react";
import {
  Button,
  cn,
  OamUiAvatar,
  OamUiBadge,
  OamUiCard,
  OamUiItem,
  OamUiToggleGroup,
  type Theme,
  useTheme,
} from "oamui";
import { useAuth } from "../auth/react/use-auth";
import { formatDate } from "../lib/format";
import { THEMES } from "./themes";

type ProfileScreenProps = { className?: string };

// The signed-in account (shared by every app), the theme and sign out
export const ProfileScreen = ({ className }: ProfileScreenProps) => {
  const { user, client } = useAuth();
  const { theme, setTheme } = useTheme();
  if (!user) return null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <OamUiItem
        variant="outline"
        media={<OamUiAvatar name={user.name} size="lg" />}
        title={user.name}
        description={`${user.email} · member since ${formatDate(user.createdAt)}`}
        actions={<OamUiBadge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</OamUiBadge>}
      />
      <OamUiCard title="Theme" description="Applies to every app on this device.">
        <OamUiToggleGroup
          type="single"
          variant="outline"
          value={theme}
          onValueChange={(value) => value && setTheme(value as Theme)}
          items={THEMES.map(({ value, label, icon: Icon }) => ({ value, label, icon: <Icon /> }))}
        />
      </OamUiCard>
      <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => client.signOut()}>
        <LogOut />
        Sign out
      </Button>
    </div>
  );
};

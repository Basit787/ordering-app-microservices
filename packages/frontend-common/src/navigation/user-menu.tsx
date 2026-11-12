import { House, LogOut, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  OamUiAvatar,
  type Theme,
  useTheme,
} from "oamui";
import type { ReactNode } from "react";
import { useAuth } from "../auth/react/use-auth";
import { frontendUrl } from "../lib/service-url";
import { THEMES } from "./themes";

type UserMenuProps = {
  // Extra entries above "Home", e.g. a link to the app's profile page
  children?: ReactNode;
};

// Signed-in user's avatar: account, theme, home and sign out
export const UserMenu = ({ children }: UserMenuProps) => {
  const { user, client } = useAuth();
  const { theme, setTheme } = useTheme();
  if (!user) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className="rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label="Account menu"
      >
        <OamUiAvatar name={user.name} size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex items-center gap-3 py-2">
          <OamUiAvatar name={user.name} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs font-normal text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as Theme)}>
              {THEMES.map(({ value, label, icon: Icon }) => (
                <DropdownMenuRadioItem key={value} value={value}>
                  <Icon />
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem asChild>
          <a href={frontendUrl("auth")}>
            <House />
            Home
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => client.signOut()}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

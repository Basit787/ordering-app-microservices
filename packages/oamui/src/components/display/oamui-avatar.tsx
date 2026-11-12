import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "oamui/ui/avatar";
import type { ReactNode } from "react";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

type OamUiAvatarProps = {
  name: string;
  src?: string;
  size?: "default" | "sm" | "lg";
  // Small dot or icon in the corner, e.g. online status
  badge?: ReactNode;
  className?: string;
};

// Image with initials fallback
export function OamUiAvatar({ name, src, size, badge, className }: OamUiAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback>{initials(name)}</AvatarFallback>
      {badge && <AvatarBadge>{badge === true ? null : badge}</AvatarBadge>}
    </Avatar>
  );
}

type OamUiAvatarGroupProps = {
  users: { name: string; src?: string }[];
  // Avatars shown before "+N"
  max?: number;
  size?: "default" | "sm" | "lg";
  className?: string;
};

export function OamUiAvatarGroup({ users, max = 4, size, className }: OamUiAvatarGroupProps) {
  const shown = users.slice(0, max);
  const rest = users.length - shown.length;
  return (
    <AvatarGroup className={className}>
      {shown.map((user, index) => (
        <OamUiAvatar key={`${user.name}-${index}`} name={user.name} src={user.src} size={size} />
      ))}
      {rest > 0 && <AvatarGroupCount>+{rest}</AvatarGroupCount>}
    </AvatarGroup>
  );
}

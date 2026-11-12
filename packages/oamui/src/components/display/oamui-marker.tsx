import { Marker, MarkerContent, MarkerIcon } from "oamui/ui/marker";
import type { ReactNode } from "react";

type OamUiMarkerProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "separator";
  className?: string;
};

// Inline status line in a conversation, e.g. "Today" or "Alex joined"
export function OamUiMarker({ children, icon, variant, className }: OamUiMarkerProps) {
  return (
    <Marker variant={variant} className={className}>
      {icon && <MarkerIcon>{icon}</MarkerIcon>}
      <MarkerContent>{children}</MarkerContent>
    </Marker>
  );
}

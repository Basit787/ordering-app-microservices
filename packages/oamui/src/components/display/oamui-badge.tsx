import { Badge } from "oamui/ui/badge";
import type * as React from "react";

type OamUiBadgeProps = React.ComponentProps<typeof Badge> & { icon?: React.ReactNode };

export function OamUiBadge({ icon, children, ...props }: OamUiBadgeProps) {
  return (
    <Badge {...props}>
      {icon}
      {children}
    </Badge>
  );
}

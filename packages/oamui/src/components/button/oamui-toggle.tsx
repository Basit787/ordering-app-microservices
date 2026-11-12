import { Toggle } from "oamui/ui/toggle";
import type * as React from "react";

type OamUiToggleProps = React.ComponentProps<typeof Toggle> & { icon?: React.ReactNode; label?: React.ReactNode };

export function OamUiToggle({ icon, label, children, ...props }: OamUiToggleProps) {
  return (
    <Toggle {...props}>
      {icon}
      {label}
      {children}
    </Toggle>
  );
}

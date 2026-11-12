import { Button } from "oamui/ui/button";
import { Spinner } from "oamui/ui/spinner";
import type * as React from "react";

type OamUiButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
};

// Button with optional icons and a loading spinner that also disables it
export function OamUiButton({ loading, icon, iconRight, disabled, children, ...props }: OamUiButtonProps) {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading ? <Spinner /> : icon}
      {children}
      {iconRight}
    </Button>
  );
}

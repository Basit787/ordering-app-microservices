import { cn } from "oamui/lib/utils";
import { Spinner } from "oamui/ui/spinner";
import type { ReactNode } from "react";

type OamUiSpinnerProps = { label?: ReactNode; className?: string };

export function OamUiSpinner({ label, className }: OamUiSpinnerProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)}>
      <Spinner />
      {label}
    </span>
  );
}

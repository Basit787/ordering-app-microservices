import { cn } from "oamui/lib/utils";
import { Separator } from "oamui/ui/separator";
import type { ReactNode } from "react";

type OamUiSeparatorProps = { label?: ReactNode; orientation?: "horizontal" | "vertical"; className?: string };

// Divider, optionally with centred text such as "or"
export function OamUiSeparator({ label, orientation, className }: OamUiSeparatorProps) {
  if (!label) return <Separator orientation={orientation} className={className} />;
  return (
    <div className={cn("flex items-center gap-3 text-xs text-muted-foreground", className)}>
      <Separator className="flex-1" />
      <span>{label}</span>
      <Separator className="flex-1" />
    </div>
  );
}

import { cn } from "oamui/lib/utils";
import { Card, CardContent } from "oamui/ui/card";
import type { ReactNode } from "react";

type OamUiStatCardProps = {
  label: ReactNode;
  // Shown large; a missing value shows a dash
  value: ReactNode;
  // Icon in the tinted square on the left
  icon?: ReactNode;
  // Small text under the value, e.g. "since yesterday"
  description?: ReactNode;
  className?: string;
};

// One figure with its label, e.g. a dashboard total
export function OamUiStatCard({ label, value, icon, description, className }: OamUiStatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-4">
        {icon && (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary [&_svg]:size-5">
            {icon}
          </div>
        )}
        <div className={cn("min-w-0")}>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value ?? "—"}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

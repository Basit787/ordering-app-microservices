import { Progress } from "oamui/ui/progress";
import type { ReactNode } from "react";

type OamUiProgressProps = { value: number; label?: ReactNode; showValue?: boolean; className?: string };

export function OamUiProgress({ value, label, showValue, className }: OamUiProgressProps) {
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1.5 flex justify-between text-sm">
          <span>{label}</span>
          {showValue && <span className="text-muted-foreground">{Math.round(value)}%</span>}
        </div>
      )}
      <Progress value={value} />
    </div>
  );
}

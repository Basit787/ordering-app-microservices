import { Tooltip, TooltipContent, TooltipTrigger } from "oamui/ui/tooltip";
import type { ReactNode } from "react";

type OamUiTooltipProps = {
  // What shows on hover / focus
  text: ReactNode;
  // The element that triggers the tooltip
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  disabled?: boolean;
};

export function OamUiTooltip({ text, children, side, align, delayDuration, disabled }: OamUiTooltipProps) {
  if (disabled || !text) return <>{children}</>;
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

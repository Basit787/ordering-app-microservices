import { HoverCard, HoverCardContent, HoverCardTrigger } from "oamui/ui/hover-card";
import type { ReactNode } from "react";

type OamUiHoverCardProps = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  openDelay?: number;
  className?: string;
};

export function OamUiHoverCard({ content, children, side, align, openDelay, className }: OamUiHoverCardProps) {
  return (
    <HoverCard openDelay={openDelay}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side={side} align={align} className={className}>
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}

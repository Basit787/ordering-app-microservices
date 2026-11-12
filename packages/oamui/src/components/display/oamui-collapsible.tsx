import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "oamui/ui/collapsible";
import type { ReactNode } from "react";

type OamUiCollapsibleProps = {
  // The element that toggles the content
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
};

export function OamUiCollapsible({
  trigger,
  children,
  open,
  onOpenChange,
  defaultOpen,
  className,
}: OamUiCollapsibleProps) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} className={className}>
      <CollapsibleTrigger asChild>{trigger}</CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

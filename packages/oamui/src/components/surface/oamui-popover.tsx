import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "oamui/ui/popover";
import type { ReactNode } from "react";

type OamUiPopoverProps = {
  content: ReactNode;
  // The element that opens the popover
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
};

export function OamUiPopover({
  content,
  children,
  title,
  description,
  open,
  onOpenChange,
  side,
  align,
  className,
}: OamUiPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side={side} align={align} className={className}>
        {(title || description) && (
          <PopoverHeader>
            {title && <PopoverTitle>{title}</PopoverTitle>}
            {description && <PopoverDescription>{description}</PopoverDescription>}
          </PopoverHeader>
        )}
        {content}
      </PopoverContent>
    </Popover>
  );
}

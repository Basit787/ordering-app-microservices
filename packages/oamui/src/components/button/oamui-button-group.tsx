import { Button } from "oamui/ui/button";
import { ButtonGroup } from "oamui/ui/button-group";
import type * as React from "react";

type OamUiButtonGroupItem = {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

type OamUiButtonGroupProps = {
  items: OamUiButtonGroupItem[];
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function OamUiButtonGroup({ items, variant = "outline", size, orientation, className }: OamUiButtonGroupProps) {
  return (
    <ButtonGroup orientation={orientation} className={className}>
      {items.map((item, index) => (
        <Button
          key={index}
          variant={variant}
          size={size}
          onClick={item.onClick}
          disabled={item.disabled}
          aria-label={item.ariaLabel}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

import { ToggleGroup, ToggleGroupItem } from "oamui/ui/toggle-group";
import type * as React from "react";

type OamUiToggleGroupItem = {
  value: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
};

// Keeps the single / multiple union intact while dropping `children`
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type OamUiToggleGroupProps = DistributiveOmit<React.ComponentProps<typeof ToggleGroup>, "children"> & {
  items: OamUiToggleGroupItem[];
};

export function OamUiToggleGroup({ items, ...props }: OamUiToggleGroupProps) {
  return (
    <ToggleGroup {...props}>
      {items.map((item) => (
        <ToggleGroupItem key={item.value} value={item.value} aria-label={item.ariaLabel} disabled={item.disabled}>
          {item.icon}
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

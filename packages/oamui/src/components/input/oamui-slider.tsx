import { Slider } from "oamui/ui/slider";
import type * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";

type OamUiSliderProps = React.ComponentProps<typeof Slider> &
  Pick<OamUiFieldProps, "label" | "description"> & { showValue?: boolean };

export function OamUiSlider({ label, description, showValue, className, ...props }: OamUiSliderProps) {
  const current = props.value ?? props.defaultValue ?? [];
  return (
    <OamUiField
      label={
        label && (
          <span className="flex w-full justify-between">
            {label}
            {showValue && <span className="text-muted-foreground">{current.join(" – ")}</span>}
          </span>
        )
      }
      description={description}
      className={className}
    >
      <Slider {...props} />
    </OamUiField>
  );
}

import { InputGroup, InputGroupAddon, InputGroupInput } from "oamui/ui/input-group";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";

type OamUiInputGroupProps = React.ComponentProps<typeof InputGroupInput> &
  Pick<OamUiFieldProps, "label" | "description" | "error"> & {
    // Icon, text or button shown before / after the input
    start?: React.ReactNode;
    end?: React.ReactNode;
  };

export function OamUiInputGroup({
  start,
  end,
  label,
  description,
  error,
  id,
  className,
  ...props
}: OamUiInputGroupProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  return (
    <OamUiField label={label} description={description} error={error} htmlFor={inputId} className={className}>
      <InputGroup>
        <InputGroupInput id={inputId} aria-invalid={error ? true : undefined} {...props} />
        {start && <InputGroupAddon>{start}</InputGroupAddon>}
        {end && <InputGroupAddon align="inline-end">{end}</InputGroupAddon>}
      </InputGroup>
    </OamUiField>
  );
}

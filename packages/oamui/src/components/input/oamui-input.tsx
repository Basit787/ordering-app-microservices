import { Input } from "oamui/ui/input";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";

type OamUiInputProps = React.ComponentProps<typeof Input> & Pick<OamUiFieldProps, "label" | "description" | "error">;

export function OamUiInput({ label, description, error, id, className, ...props }: OamUiInputProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  return (
    <OamUiField label={label} description={description} error={error} htmlFor={inputId} className={className}>
      <Input id={inputId} aria-invalid={error ? true : undefined} {...props} />
    </OamUiField>
  );
}

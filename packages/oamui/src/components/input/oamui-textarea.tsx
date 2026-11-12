import { Textarea } from "oamui/ui/textarea";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";

type OamUiTextareaProps = React.ComponentProps<typeof Textarea> &
  Pick<OamUiFieldProps, "label" | "description" | "error">;

export function OamUiTextarea({ label, description, error, id, className, ...props }: OamUiTextareaProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  return (
    <OamUiField label={label} description={description} error={error} htmlFor={inputId} className={className}>
      <Textarea id={inputId} aria-invalid={error ? true : undefined} {...props} />
    </OamUiField>
  );
}

import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";
import { PasswordInput } from "./password-input";

type OamUiPasswordInputProps = React.ComponentProps<typeof PasswordInput> &
  Pick<OamUiFieldProps, "label" | "description" | "error">;

export function OamUiPasswordInput({ label, description, error, id, className, ...props }: OamUiPasswordInputProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  return (
    <OamUiField label={label} description={description} error={error} htmlFor={inputId} className={className}>
      <PasswordInput id={inputId} aria-invalid={error ? true : undefined} {...props} />
    </OamUiField>
  );
}

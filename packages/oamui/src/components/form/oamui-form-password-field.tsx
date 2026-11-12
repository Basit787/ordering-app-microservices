import type { ComponentProps } from "react";
import { OamUiPasswordInput } from "../input/oamui-password-input";
import { fieldError } from "./field-error";
import { useFieldContext } from "./form-context";

type OamUiFormPasswordFieldProps = Omit<
  ComponentProps<typeof OamUiPasswordInput>,
  "name" | "value" | "onChange" | "onBlur" | "error"
>;

// Password input with show/hide, bound to the surrounding form.AppField
export function OamUiFormPasswordField(props: OamUiFormPasswordFieldProps) {
  const field = useFieldContext<string>();
  return (
    <OamUiPasswordInput
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={(event) => field.handleChange(event.target.value)}
      onBlur={field.handleBlur}
      error={fieldError(field.state.meta)}
    />
  );
}

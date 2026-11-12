import type { ComponentProps } from "react";
import { OamUiInput } from "../input/oamui-input";
import { fieldError } from "./field-error";
import { useFieldContext } from "./form-context";

type OamUiFormTextFieldProps = Omit<
  ComponentProps<typeof OamUiInput>,
  "name" | "value" | "onChange" | "onBlur" | "error"
>;

// Text input bound to the surrounding form.AppField
export function OamUiFormTextField(props: OamUiFormTextFieldProps) {
  const field = useFieldContext<string>();
  return (
    <OamUiInput
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={(event) => field.handleChange(event.target.value)}
      onBlur={field.handleBlur}
      error={fieldError(field.state.meta)}
    />
  );
}

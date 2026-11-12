import type { ComponentProps } from "react";
import { OamUiTextarea } from "../input/oamui-textarea";
import { fieldError } from "./field-error";
import { useFieldContext } from "./form-context";

type OamUiFormTextareaFieldProps = Omit<
  ComponentProps<typeof OamUiTextarea>,
  "name" | "value" | "onChange" | "onBlur" | "error"
>;

// Textarea bound to the surrounding form.AppField
export function OamUiFormTextareaField(props: OamUiFormTextareaFieldProps) {
  const field = useFieldContext<string>();
  return (
    <OamUiTextarea
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={(event) => field.handleChange(event.target.value)}
      onBlur={field.handleBlur}
      error={fieldError(field.state.meta)}
    />
  );
}

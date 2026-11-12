import { FieldError } from "oamui/ui/field";
import type { ReactNode } from "react";
import { OamUiCheckbox } from "../input/oamui-checkbox";
import { fieldError } from "./field-error";
import { useFieldContext } from "./form-context";

type OamUiFormCheckboxFieldProps = { label?: ReactNode; description?: ReactNode; className?: string };

// Checkbox bound to a boolean form.AppField
export function OamUiFormCheckboxField({ label, description, className }: OamUiFormCheckboxFieldProps) {
  const field = useFieldContext<boolean>();
  const error = fieldError(field.state.meta);
  return (
    <div className={className}>
      <OamUiCheckbox
        name={field.name}
        label={label}
        description={description}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
        onBlur={field.handleBlur}
        aria-invalid={error ? true : undefined}
      />
      {error && <FieldError className="mt-1">{error}</FieldError>}
    </div>
  );
}

import { Checkbox } from "oamui/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "oamui/ui/field";
import * as React from "react";

type OamUiCheckboxProps = React.ComponentProps<typeof Checkbox> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
};

export function OamUiCheckbox({ label, description, id, className, ...props }: OamUiCheckboxProps) {
  const autoId = React.useId();
  const checkboxId = id ?? autoId;
  return (
    <Field orientation="horizontal" className={className}>
      <Checkbox id={checkboxId} {...props} />
      {(label || description) && (
        <FieldContent>
          {label && <FieldLabel htmlFor={checkboxId}>{label}</FieldLabel>}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      )}
    </Field>
  );
}

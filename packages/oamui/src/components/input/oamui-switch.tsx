import { Field, FieldContent, FieldDescription, FieldLabel } from "oamui/ui/field";
import { Switch } from "oamui/ui/switch";
import * as React from "react";

type OamUiSwitchProps = React.ComponentProps<typeof Switch> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
};

export function OamUiSwitch({ label, description, id, className, ...props }: OamUiSwitchProps) {
  const autoId = React.useId();
  const switchId = id ?? autoId;
  return (
    <Field orientation="horizontal" className={className}>
      {(label || description) && (
        <FieldContent>
          {label && <FieldLabel htmlFor={switchId}>{label}</FieldLabel>}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      )}
      <Switch id={switchId} {...props} />
    </Field>
  );
}

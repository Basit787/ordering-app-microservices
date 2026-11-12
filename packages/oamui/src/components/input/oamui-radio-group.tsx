import { Field, FieldContent, FieldDescription, FieldLabel } from "oamui/ui/field";
import { RadioGroup, RadioGroupItem } from "oamui/ui/radio-group";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";
import type { OamUiOption } from "./oamui-option";

type OamUiRadioGroupProps = Omit<React.ComponentProps<typeof RadioGroup>, "children"> &
  Pick<OamUiFieldProps, "label" | "description" | "error"> & { options: OamUiOption[] };

export function OamUiRadioGroup({ options, label, description, error, className, ...props }: OamUiRadioGroupProps) {
  const groupId = React.useId();
  return (
    <OamUiField label={label} description={description} error={error} className={className}>
      <RadioGroup {...props}>
        {options.map((option) => {
          const itemId = `${groupId}-${option.value}`;
          return (
            <Field key={option.value} orientation="horizontal">
              <RadioGroupItem id={itemId} value={option.value} disabled={option.disabled} />
              <FieldContent>
                <FieldLabel htmlFor={itemId}>{option.label}</FieldLabel>
                {option.description && <FieldDescription>{option.description}</FieldDescription>}
              </FieldContent>
            </Field>
          );
        })}
      </RadioGroup>
    </OamUiField>
  );
}

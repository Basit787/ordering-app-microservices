import { NativeSelect, NativeSelectOption } from "oamui/ui/native-select";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";

type OamUiNativeSelectProps = Omit<React.ComponentProps<typeof NativeSelect>, "children"> &
  Pick<OamUiFieldProps, "label" | "description" | "error"> & {
    options: { value: string; label: string; disabled?: boolean }[];
    placeholder?: string;
  };

export function OamUiNativeSelect({
  options,
  placeholder,
  label,
  description,
  error,
  id,
  className,
  ...props
}: OamUiNativeSelectProps) {
  const autoId = React.useId();
  const selectId = id ?? autoId;
  return (
    <OamUiField label={label} description={description} error={error} htmlFor={selectId} className={className}>
      <NativeSelect id={selectId} aria-invalid={error ? true : undefined} {...props}>
        {placeholder && <NativeSelectOption value="">{placeholder}</NativeSelectOption>}
        {options.map((option) => (
          <NativeSelectOption key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </OamUiField>
  );
}

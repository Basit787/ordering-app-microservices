import { cn } from "oamui/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "oamui/ui/select";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";
import type { OamUiOption } from "./oamui-option";

type OamUiSelectProps = Omit<React.ComponentProps<typeof Select>, "children"> &
  Pick<OamUiFieldProps, "label" | "description" | "error"> & {
    options: OamUiOption[];
    placeholder?: string;
    id?: string;
    className?: string;
  };

export function OamUiSelect({
  options,
  placeholder,
  label,
  description,
  error,
  id,
  className,
  ...props
}: OamUiSelectProps) {
  const autoId = React.useId();
  const triggerId = id ?? autoId;
  return (
    <OamUiField label={label} description={description} error={error} htmlFor={triggerId} className={className}>
      <Select {...props}>
        <SelectTrigger id={triggerId} aria-invalid={error ? true : undefined} className={cn("w-full")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.icon}
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </OamUiField>
  );
}

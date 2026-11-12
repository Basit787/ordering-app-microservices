import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "oamui/lib/utils";
import { Button } from "oamui/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "oamui/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "oamui/ui/popover";
import * as React from "react";
import { OamUiField, type OamUiFieldProps } from "./oamui-field";
import type { OamUiOption } from "./oamui-option";

type OamUiComboboxProps = Pick<OamUiFieldProps, "label" | "description" | "error"> & {
  options: (OamUiOption & { label: string })[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
};

// Searchable select (Popover + Command)
export function OamUiCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "Nothing found.",
  disabled,
  label,
  description,
  error,
  className,
}: OamUiComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const buttonId = React.useId();
  const selected = options.find((option) => option.value === value);
  return (
    <OamUiField label={label} description={description} error={error} htmlFor={buttonId} className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={buttonId}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={cn("w-full justify-between font-normal", !selected && "text-muted-foreground")}
          >
            {selected?.label ?? placeholder}
            <ChevronsUpDownIcon className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => {
                      onValueChange?.(option.value === value ? "" : option.value);
                      setOpen(false);
                    }}
                  >
                    {option.icon}
                    {option.label}
                    <CheckIcon className={cn("ml-auto", option.value === value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </OamUiField>
  );
}

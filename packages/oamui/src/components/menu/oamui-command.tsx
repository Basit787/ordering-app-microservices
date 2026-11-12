import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "oamui/ui/command";
import type { ReactNode } from "react";

export type OamUiCommandGroup = {
  heading?: string;
  items: {
    label: string;
    value?: string;
    icon?: ReactNode;
    shortcut?: string;
    onSelect?: () => void;
    disabled?: boolean;
  }[];
};

type OamUiCommandListProps = { groups: OamUiCommandGroup[]; placeholder?: string; emptyText?: string };

function CommandBody({
  groups,
  placeholder = "Type a command or search…",
  emptyText = "No results found.",
}: OamUiCommandListProps) {
  return (
    <>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {groupIndex > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.value ?? item.label}
                  value={item.value ?? item.label}
                  onSelect={item.onSelect}
                  disabled={item.disabled}
                >
                  {item.icon}
                  {item.label}
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </>
  );
}

// Inline searchable command list
export function OamUiCommand({ className, ...props }: OamUiCommandListProps & { className?: string }) {
  return (
    <Command className={className}>
      <CommandBody {...props} />
    </Command>
  );
}

// Command palette in a dialog (e.g. opened with ⌘K)
export function OamUiCommandDialog({
  open,
  onOpenChange,
  title,
  ...props
}: OamUiCommandListProps & { open: boolean; onOpenChange: (open: boolean) => void; title?: string }) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title={title}>
      <CommandBody {...props} />
    </CommandDialog>
  );
}

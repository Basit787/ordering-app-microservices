import { Kbd, KbdGroup } from "oamui/ui/kbd";

type OamUiKbdProps = { keys: string[]; className?: string };

// Keyboard shortcut, e.g. keys={["⌘", "K"]}
export function OamUiKbd({ keys, className }: OamUiKbdProps) {
  return (
    <KbdGroup className={className}>
      {keys.map((key) => (
        <Kbd key={key}>{key}</Kbd>
      ))}
    </KbdGroup>
  );
}

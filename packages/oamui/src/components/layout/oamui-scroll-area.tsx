import { ScrollArea } from "oamui/ui/scroll-area";
import type * as React from "react";

type OamUiScrollAreaProps = React.ComponentProps<typeof ScrollArea> & {
  // Fixed height, e.g. 300 or "50vh"
  height?: number | string;
};

export function OamUiScrollArea({ height, style, ...props }: OamUiScrollAreaProps) {
  return <ScrollArea style={{ height, ...style }} {...props} />;
}

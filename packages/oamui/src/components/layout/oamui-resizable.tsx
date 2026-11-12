import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "oamui/ui/resizable";
import type { ComponentProps, ReactNode } from "react";

type PanelSize = ComponentProps<typeof ResizablePanel>["defaultSize"];

type OamUiResizableProps = {
  panels: { content: ReactNode; defaultSize?: PanelSize; minSize?: PanelSize }[];
  orientation?: "horizontal" | "vertical";
  withHandle?: boolean;
  className?: string;
};

// Panels separated by draggable handles
export function OamUiResizable({
  panels,
  orientation = "horizontal",
  withHandle = true,
  className,
}: OamUiResizableProps) {
  return (
    <ResizablePanelGroup orientation={orientation} className={className}>
      {panels.flatMap((panel, index) => [
        ...(index > 0 ? [<ResizableHandle key={`handle-${index}`} withHandle={withHandle} />] : []),
        <ResizablePanel key={`panel-${index}`} defaultSize={panel.defaultSize} minSize={panel.minSize}>
          {panel.content}
        </ResizablePanel>,
      ])}
    </ResizablePanelGroup>
  );
}

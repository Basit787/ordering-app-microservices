import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "oamui/ui/empty";
import type { ReactNode } from "react";

type OamUiEmptyProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  // Buttons or links under the text
  action?: ReactNode;
  className?: string;
};

// Empty state: nothing here yet
export function OamUiEmpty({ title, description, icon, action, className }: OamUiEmptyProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  );
}

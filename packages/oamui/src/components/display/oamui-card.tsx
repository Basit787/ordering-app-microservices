import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "oamui/ui/card";
import type { ReactNode } from "react";

type OamUiCardProps = {
  title?: ReactNode;
  description?: ReactNode;
  // Element in the header's top-right corner, e.g. a button
  action?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function OamUiCard({ title, description, action, footer, children, className }: OamUiCardProps) {
  return (
    <Card className={className}>
      {(title || description || action) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

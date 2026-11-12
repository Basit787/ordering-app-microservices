import { Alert, AlertDescription, AlertTitle } from "oamui/ui/alert";
import type { ReactNode } from "react";

type OamUiAlertProps = {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "destructive";
  className?: string;
};

export function OamUiAlert({ title, description, icon, variant, className }: OamUiAlertProps) {
  return (
    <Alert variant={variant} className={className}>
      {icon}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}

import type { ReactNode } from "react";

type PageHeaderProps = { title: string; description?: string; actions?: ReactNode };

export const PageHeader = ({ title, description, actions }: PageHeaderProps) => (
  <div className="flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
    {actions}
  </div>
);

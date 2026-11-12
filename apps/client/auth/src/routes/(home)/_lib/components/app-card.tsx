import { ArrowUpRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "oamui";
import type { AppEntry } from "../utils/apps";

export const AppCard = ({ app }: { app: AppEntry }) => {
  const Icon = app.icon;
  return (
    <a
      href={app.url}
      className="group block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Card className="h-full transition-colors group-hover:border-primary/40 group-hover:bg-accent/40">
        <CardHeader className="gap-3">
          <div className="flex items-start justify-between">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon className="size-5" />
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
          </div>
          <CardTitle className="text-base">{app.name}</CardTitle>
          <CardDescription className="line-clamp-2">{app.description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
};

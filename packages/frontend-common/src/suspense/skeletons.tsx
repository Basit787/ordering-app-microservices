import {
  Card,
  CardContent,
  CardHeader,
  cn,
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  Skeleton,
} from "oamui";

// Placeholders built from the same Card and Item shapes as the content they stand for; every loading state uses
// one of these, not a spinner

const rows = (count: number) => Array.from({ length: count }, (_, index) => index);

export const TextSkeleton = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={cn("space-y-2", className)}>
    {rows(lines).map((line) => (
      <Skeleton key={line} className={cn("h-4", line === lines - 1 ? "w-2/3" : "w-full")} />
    ))}
  </div>
);

// Product cards: picture, two lines
export const CardGridSkeleton = ({ count = 8, className }: { count?: number; className?: string }) => (
  <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
    {rows(count).map((card) => (
      <Card key={card} className="gap-0 overflow-hidden py-0">
        <Skeleton className="aspect-square w-full rounded-none" />
        <CardContent className="space-y-2 p-4">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    ))}
  </div>
);

// List rows (orders, cart lines)
export const ListSkeleton = ({ count = 4 }: { count?: number }) => (
  <ItemGroup className="gap-3">
    {rows(count).map((row) => (
      <Item key={row} variant="outline">
        <ItemMedia>
          <Skeleton className="size-12 rounded-lg" />
        </ItemMedia>
        <ItemContent className="gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </ItemContent>
        <ItemActions>
          <Skeleton className="h-5 w-16" />
        </ItemActions>
      </Item>
    ))}
  </ItemGroup>
);

// Data tables: toolbar, header and rows
export const TableSkeleton = ({ rows: count = 8, columns = 5 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3">
    <div className="flex justify-between gap-3">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-9 w-32" />
    </div>
    <Card className="gap-0 py-0">
      {rows(count + 1).map((row) => (
        <div key={row} className={cn("flex gap-4 border-b px-4 py-3 last:border-b-0", row === 0 && "bg-muted/40")}>
          {rows(columns).map((column) => (
            <Skeleton key={column} className={cn("h-4 flex-1", column === 0 && "flex-[2]")} />
          ))}
        </div>
      ))}
    </Card>
  </div>
);

// A picture beside a title, a price and text (product, order)
export const DetailSkeleton = () => (
  <div className="grid gap-8 md:grid-cols-2">
    <Skeleton className="aspect-square w-full rounded-xl" />
    <div className="space-y-4">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-7 w-28" />
      <TextSkeleton lines={4} />
      <Skeleton className="h-10 w-40" />
    </div>
  </div>
);

// Labelled inputs in a card
export const FormSkeleton = ({ fields = 6 }: { fields?: number }) => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-40" />
    </CardHeader>
    <CardContent className="grid gap-4 sm:grid-cols-2">
      {rows(fields).map((field) => (
        <div key={field} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-44" />
    </CardContent>
  </Card>
);

// Dashboard tiles
export const StatGridSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {rows(count).map((stat) => (
      <Card key={stat}>
        <CardContent className="flex items-center gap-4">
          <Skeleton className="size-11 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-12" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Filter chips
export const ChipsSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="flex flex-wrap gap-2">
    {rows(count).map((chip) => (
      <Skeleton key={chip} className="h-8 w-20 rounded-md" />
    ))}
  </div>
);

// A whole page while its route chunk loads: header bar, title, content
export const PageSkeleton = () => (
  <div className="min-h-dvh bg-background">
    <div className="flex h-14 items-center gap-3 border-b px-4 md:px-6">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="ml-auto size-8 rounded-full" />
    </div>
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6">
      <Skeleton className="h-8 w-48" />
      <CardGridSkeleton count={4} />
    </div>
  </div>
);

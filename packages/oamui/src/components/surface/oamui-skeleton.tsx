import { cn } from "oamui/lib/utils";
import { Skeleton } from "oamui/ui/skeleton";

type OamUiSkeletonProps = { lines?: number; avatar?: boolean; className?: string };

// Placeholder while content loads: optional avatar circle plus text lines
export function OamUiSkeleton({ lines = 3, avatar, className }: OamUiSkeletonProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      {avatar && <Skeleton className="size-10 shrink-0 rounded-full" />}
      <div className="flex flex-1 flex-col gap-2">
        {Array.from({ length: lines }, (_, index) => (
          <Skeleton key={index} className={cn("h-4", index === lines - 1 && lines > 1 ? "w-3/5" : "w-full")} />
        ))}
      </div>
    </div>
  );
}

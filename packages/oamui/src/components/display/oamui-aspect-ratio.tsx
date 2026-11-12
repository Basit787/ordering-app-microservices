import { cn } from "oamui/lib/utils";
import { AspectRatio } from "oamui/ui/aspect-ratio";
import type { ReactNode } from "react";

type OamUiAspectRatioProps = {
  ratio?: number;
  // Image source; or pass children instead
  src?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
};

export function OamUiAspectRatio({ ratio = 16 / 9, src, alt = "", children, className }: OamUiAspectRatioProps) {
  return (
    <AspectRatio ratio={ratio} className={cn("overflow-hidden rounded-lg bg-muted", className)}>
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : children}
    </AspectRatio>
  );
}

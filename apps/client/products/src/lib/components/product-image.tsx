import { resolveImageUrl } from "frontend-common";
import { Package } from "lucide-react";
import { cn } from "oamui";

type ProductImageProps = { src: string | null; alt: string; className?: string };

// The product photo, or a calm placeholder when there is none
export const ProductImage = ({ src, alt, className }: ProductImageProps) =>
  src ? (
    <img
      src={resolveImageUrl(src)}
      alt={alt}
      loading="lazy"
      className={cn("aspect-square w-full rounded-lg object-cover", className)}
    />
  ) : (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-lg bg-muted text-muted-foreground",
        className,
      )}
    >
      <Package className="size-10" />
    </div>
  );

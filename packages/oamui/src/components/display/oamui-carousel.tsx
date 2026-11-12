import { cn } from "oamui/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "oamui/ui/carousel";
import type { ReactNode } from "react";

type OamUiCarouselProps = {
  items: ReactNode[];
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  showArrows?: boolean;
  // Tailwind basis per slide, e.g. "basis-1/3"
  itemClassName?: string;
  className?: string;
};

export function OamUiCarousel({
  items,
  orientation,
  loop,
  showArrows = true,
  itemClassName,
  className,
}: OamUiCarouselProps) {
  return (
    <Carousel orientation={orientation} opts={{ loop }} className={cn("w-full", className)}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      {showArrows && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}

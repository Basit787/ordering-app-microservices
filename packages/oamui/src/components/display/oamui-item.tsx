import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "oamui/ui/item";
import type { ReactNode } from "react";

type OamUiItemProps = {
  title: ReactNode;
  description?: ReactNode;
  // Icon or avatar on the left
  media?: ReactNode;
  // Buttons on the right
  actions?: ReactNode;
  variant?: "default" | "outline" | "muted";
  className?: string;
};

// List row: media, title, description and actions
export function OamUiItem({ title, description, media, actions, variant, className }: OamUiItemProps) {
  return (
    <Item variant={variant} className={className}>
      {media && <ItemMedia>{media}</ItemMedia>}
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        {description && <ItemDescription>{description}</ItemDescription>}
      </ItemContent>
      {actions && <ItemActions>{actions}</ItemActions>}
    </Item>
  );
}

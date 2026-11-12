import { type CartLine, formatMoney, resolveImageUrl } from "frontend-common";
import { Package, Trash2 } from "lucide-react";
import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  OamUiNativeSelect,
} from "oamui";
import { useRemoveCartItem, useSetCartItem } from "../api/hook";

const MAX_PER_LINE = 10;

export const CartLineRow = ({ line }: { line: CartLine }) => {
  const setItem = useSetCartItem();
  const remove = useRemoveCartItem();
  const most = Math.max(Math.min(line.stock, MAX_PER_LINE), line.quantity);

  return (
    <Item>
      <ItemMedia variant={line.imageUrl ? "image" : "icon"} className={line.imageUrl ? "size-16" : undefined}>
        {line.imageUrl ? <img src={resolveImageUrl(line.imageUrl)} alt={line.name} /> : <Package />}
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{line.name}</ItemTitle>
        <ItemDescription className={line.available ? undefined : "text-destructive"}>
          {line.available
            ? `${formatMoney(line.priceCents)} each`
            : line.stock === 0
              ? "No longer available"
              : `Only ${line.stock} left — lower the quantity`}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <OamUiNativeSelect
          aria-label={`Quantity of ${line.name}`}
          className="w-20"
          value={String(line.quantity)}
          disabled={setItem.isPending}
          onChange={(event) => setItem.mutate({ productId: line.productId, quantity: Number(event.target.value) })}
          options={Array.from({ length: most }, (_, index) => ({ value: String(index + 1), label: String(index + 1) }))}
        />
        <span className="w-24 text-right font-medium">{formatMoney(line.priceCents * line.quantity)}</span>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Remove ${line.name}`}
          disabled={remove.isPending}
          onClick={() => remove.mutate(line.productId)}
        >
          <Trash2 />
        </Button>
      </ItemActions>
    </Item>
  );
};

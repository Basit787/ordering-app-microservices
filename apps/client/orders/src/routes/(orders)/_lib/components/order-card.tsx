import { Link } from "@tanstack/react-router";
import { formatDate, formatMoney, type Order, OrderStatusBadge } from "frontend-common";
import { ChevronRight } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "oamui";

// One order in "My orders"; the short id is the last six characters, as on the order page
export const OrderCard = ({ order }: { order: Order }) => {
  const items = order.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Item asChild variant="outline">
      <Link to="/orders/$orderId" params={{ orderId: order.id }}>
        <ItemContent>
          <ItemTitle>
            Order #{order.id.slice(-6).toUpperCase()}
            <OrderStatusBadge status={order.status} />
          </ItemTitle>
          <ItemDescription>
            {formatDate(order.createdAt)} · {items} {items === 1 ? "item" : "items"}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <span className="font-semibold">{formatMoney(order.totalCents)}</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </Link>
    </Item>
  );
};

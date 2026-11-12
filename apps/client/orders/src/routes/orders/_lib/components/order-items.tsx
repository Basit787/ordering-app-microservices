import { formatMoney, type OrderItem } from "frontend-common";
import { OamUiTable, type OamUiTableColumn } from "oamui";

const columns: OamUiTableColumn<OrderItem>[] = [
  { key: "name", header: "Item", cell: (item) => <span className="font-medium">{item.name}</span> },
  { key: "quantity", header: "Qty", className: "text-right" },
  { key: "priceCents", header: "Price", className: "text-right", cell: (item) => formatMoney(item.priceCents) },
  {
    key: "total",
    header: "Total",
    className: "text-right",
    cell: (item) => formatMoney(item.priceCents * item.quantity),
  },
];

type OrderItemsProps = { items: OrderItem[]; totalCents: number };

// The lines as bought, with the total in the footer
export const OrderItems = ({ items, totalCents }: OrderItemsProps) => (
  <OamUiTable
    columns={columns}
    data={items}
    rowKey={(item) => item.productId}
    footer={
      <div className="flex justify-between">
        <span>Total</span>
        <span>{formatMoney(totalCents)}</span>
      </div>
    }
  />
);

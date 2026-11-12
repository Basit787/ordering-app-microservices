import { formatDateTime, formatMoney, ORDER_STATUS_LABEL, type Order, OrderStatusBadge } from "frontend-common";
import { Ban, Eye, PackageCheck, Truck } from "lucide-react";
import { OamUiDataTable, type OamUiDataTableColumn, type OamUiDataTableFilter, type OamUiRowAction } from "oamui";
import { useSetOrderStatus } from "../api/hook";

type OrdersTableProps = { orders: Order[]; onView: (order: Order) => void };

const filters: OamUiDataTableFilter<Order>[] = [
  {
    id: "status",
    label: "Status",
    width: 180,
    options: [
      { value: "all", label: "All" },
      ...(Object.keys(ORDER_STATUS_LABEL) as Order["status"][]).map((status) => ({
        value: status,
        label: ORDER_STATUS_LABEL[status],
        match: (order: Order) => order.status === status,
      })),
    ],
  },
];

export const OrdersTable = ({ orders, onView }: OrdersTableProps) => {
  const setStatus = useSetOrderStatus();

  const columns: OamUiDataTableColumn<Order>[] = [
    {
      id: "id",
      header: "Order",
      cell: (order) => <span className="font-medium">#{order.id.slice(-6).toUpperCase()}</span>,
    },
    { id: "userName", header: "Customer", sortable: true },
    {
      id: "items",
      header: "Items",
      searchable: false,
      className: "max-md:hidden",
      accessor: (order) => order.items.reduce((sum, item) => sum + item.quantity, 0),
    },
    {
      id: "totalCents",
      header: "Total",
      sortable: true,
      searchable: false,
      className: "text-right",
      cell: (order) => formatMoney(order.totalCents),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      searchable: false,
      cell: (order) => <OrderStatusBadge status={order.status} />,
    },
    {
      id: "createdAt",
      header: "Placed",
      sortable: true,
      searchable: false,
      className: "max-lg:hidden",
      cell: (order) => formatDateTime(order.createdAt),
    },
  ];

  const singleRowActions: OamUiRowAction<Order>[] = [
    { label: "View", icon: <Eye />, onSelect: onView },
    {
      label: "Mark shipped",
      icon: <Truck />,
      hidden: (order) => order.status !== "paid",
      onSelect: (order) => setStatus.mutate({ id: order.id, status: "shipped" }),
    },
    {
      label: "Mark delivered",
      icon: <PackageCheck />,
      hidden: (order) => order.status !== "shipped",
      onSelect: (order) => setStatus.mutate({ id: order.id, status: "delivered" }),
    },
    {
      label: "Cancel order",
      icon: <Ban />,
      destructive: true,
      hidden: (order) => order.status !== "paid" && order.status !== "pending_payment",
      onSelect: (order) => setStatus.mutate({ id: order.id, status: "cancelled" }),
      confirm: {
        title: "Cancel this order?",
        description: ([order]) =>
          order.status === "paid"
            ? "The stock goes back on sale and the payment is refunded."
            : "The stock goes back on sale.",
        confirmText: "Cancel order",
      },
    },
  ];

  return (
    <OamUiDataTable
      data={orders}
      getRowId={(order) => order.id}
      columns={columns}
      singleRowActions={singleRowActions}
      filters={filters}
      searchPlaceholder="Search by customer…"
      emptyText="No orders match."
    />
  );
};

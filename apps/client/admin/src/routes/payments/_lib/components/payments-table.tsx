import { formatDateTime, formatMoney, PAYMENT_STATUS_LABEL, type Payment, PaymentStatusBadge } from "frontend-common";
import { OamUiDataTable, type OamUiDataTableColumn, type OamUiDataTableFilter } from "oamui";

const filters: OamUiDataTableFilter<Payment>[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "all", label: "All" },
      ...(Object.keys(PAYMENT_STATUS_LABEL) as Payment["status"][]).map((status) => ({
        value: status,
        label: PAYMENT_STATUS_LABEL[status],
        match: (payment: Payment) => payment.status === status,
      })),
    ],
  },
];

const columns: OamUiDataTableColumn<Payment>[] = [
  {
    id: "orderId",
    header: "Order",
    cell: (payment) => <span className="font-medium">#{payment.orderId.slice(-6).toUpperCase()}</span>,
  },
  {
    id: "amountCents",
    header: "Amount",
    sortable: true,
    searchable: false,
    className: "text-right",
    cell: (payment) => formatMoney(payment.amountCents, payment.currency),
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    searchable: false,
    cell: (payment) => <PaymentStatusBadge status={payment.status} />,
  },
  {
    id: "provider",
    header: "Gateway",
    cell: (payment) => (payment.provider === "razorpay" ? "Razorpay" : "Test"),
  },
  {
    id: "razorpayPaymentId",
    header: "Reference",
    className: "max-md:hidden",
    cell: (payment) => payment.razorpayPaymentId ?? payment.failureReason ?? "—",
  },
  {
    id: "createdAt",
    header: "Created",
    sortable: true,
    searchable: false,
    className: "max-lg:hidden",
    cell: (payment) => formatDateTime(payment.createdAt),
  },
];

export const PaymentsTable = ({ payments }: { payments: Payment[] }) => (
  <OamUiDataTable
    data={payments}
    getRowId={(payment) => payment.id}
    columns={columns}
    filters={filters}
    searchPlaceholder="Search by order or reference…"
    emptyText="No payments yet."
  />
);

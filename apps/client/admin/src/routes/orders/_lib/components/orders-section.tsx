import { lazyComponent, type Order } from "frontend-common";
import { useState } from "react";
import { useOrders } from "../api/hook";
import { OrdersTable } from "./orders-table";

const OrderDetailsDialog = lazyComponent(
  () => import("./order-details-dialog").then((m) => m.OrderDetailsDialog),
  null,
);

export const OrdersSection = () => {
  const { data } = useOrders();
  const [viewing, setViewing] = useState<Order | null>(null);

  return (
    <>
      <OrdersTable orders={data.items} onView={setViewing} />
      {viewing && <OrderDetailsDialog order={viewing} onClose={() => setViewing(null)} />}
    </>
  );
};

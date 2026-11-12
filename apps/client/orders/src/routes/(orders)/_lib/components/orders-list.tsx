import { frontendUrl } from "frontend-common";
import { ClipboardList } from "lucide-react";
import { Button, ItemGroup, OamUiButton, OamUiEmpty } from "oamui";
import { useMyOrders } from "../api/hook";
import { OrderCard } from "./order-card";

export const OrdersList = () => {
  const orders = useMyOrders();
  const list = orders.data.pages.flatMap((page) => page.items);

  return (
    <>
      {list.length ? (
        <>
          <ItemGroup className="gap-3">
            {list.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ItemGroup>
          {orders.hasNextPage && (
            <div className="flex justify-center">
              <OamUiButton
                variant="outline"
                loading={orders.isFetchingNextPage}
                onClick={() => void orders.fetchNextPage()}
              >
                Load more
              </OamUiButton>
            </div>
          )}
        </>
      ) : (
        <OamUiEmpty
          icon={<ClipboardList />}
          title="No orders yet"
          description="When you check out, your orders show up here."
          action={
            <Button asChild>
              <a href={frontendUrl("products")}>Start shopping</a>
            </Button>
          }
          className="border"
        />
      )}
    </>
  );
};

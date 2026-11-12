import { lazyComponent, type Product } from "frontend-common";
import { useState } from "react";
import { useProducts } from "../api/hook";
import { ProductsTable } from "./products-table";

// The form chunk loads when a dialog first opens
const ProductFormDialog = lazyComponent(() => import("./product-form-dialog").then((m) => m.ProductFormDialog), null);

export const ProductsSection = () => {
  const { data } = useProducts();
  // A new key each time it opens, so the form starts from the chosen product
  const [dialog, setDialog] = useState<{ product: Product | null; key: number } | null>(null);
  const open = (product: Product | null) => setDialog({ product, key: Date.now() });
  const close = () => setDialog(null);

  return (
    <>
      <ProductsTable products={data.items} onCreate={() => open(null)} onEdit={open} />
      {dialog && (
        <ProductFormDialog key={dialog.key} open onOpenChange={(next) => !next && close()} product={dialog.product} />
      )}
    </>
  );
};

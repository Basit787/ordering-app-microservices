import { type Category, lazyComponent } from "frontend-common";
import { useState } from "react";
import { useCategories } from "../api/hook";
import { CategoriesTable } from "./categories-table";

const CategoryDialog = lazyComponent(() => import("./category-dialog").then((m) => m.CategoryDialog), null);

export const CategoriesSection = () => {
  const { data } = useCategories();
  const [dialog, setDialog] = useState<{ category: Category | null; key: number } | null>(null);
  const open = (category: Category | null) => setDialog({ category, key: Date.now() });
  const close = () => setDialog(null);

  return (
    <>
      <CategoriesTable categories={data} onCreate={() => open(null)} onEdit={open} />
      {dialog && (
        <CategoryDialog key={dialog.key} open onOpenChange={(next) => !next && close()} category={dialog.category} />
      )}
    </>
  );
};

import type { Category } from "frontend-common";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { OamUiDataTable, type OamUiDataTableColumn, type OamUiRowAction } from "oamui";
import { useDeleteCategory } from "../api/hook";

type CategoriesTableProps = {
  categories: Category[];
  onCreate: () => void;
  onEdit: (category: Category) => void;
};

export const CategoriesTable = ({ categories, onCreate, onEdit }: CategoriesTableProps) => {
  const remove = useDeleteCategory();

  const columns: OamUiDataTableColumn<Category>[] = [
    {
      id: "name",
      header: "Name",
      sortable: true,
      cell: (category) => <span className="font-medium">{category.name}</span>,
    },
    { id: "slug", header: "Slug", cell: (category) => <span className="text-muted-foreground">{category.slug}</span> },
  ];

  const singleRowActions: OamUiRowAction<Category>[] = [
    { label: "Rename", icon: <Pencil />, onSelect: onEdit },
    {
      label: "Delete",
      icon: <Trash2 />,
      destructive: true,
      onSelect: (category) => remove.mutate(category.id),
      confirm: {
        title: "Delete this category?",
        description: ([category]) => `Products in "${category.name}" stay, without a category.`,
        confirmText: "Delete",
      },
    },
  ];

  return (
    <OamUiDataTable
      data={categories}
      getRowId={(category) => category.id}
      columns={columns}
      singleRowActions={singleRowActions}
      tableActions={[{ label: "New category", icon: <Plus />, onClick: onCreate }]}
      searchPlaceholder="Search categories…"
      emptyText="No categories yet."
    />
  );
};

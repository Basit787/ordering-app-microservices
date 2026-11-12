import { formatDateTime, formatMoney, type Product, resolveImageUrl } from "frontend-common";
import { Eye, EyeOff, Package, Pencil, Plus, Trash2 } from "lucide-react";
import {
  OamUiBadge,
  OamUiDataTable,
  type OamUiDataTableColumn,
  type OamUiDataTableFilter,
  type OamUiRowAction,
} from "oamui";
import { useDeleteProduct, useSaveProduct } from "../api/hook";

type ProductsTableProps = {
  products: Product[];
  onCreate: () => void;
  onEdit: (product: Product) => void;
};

const filters: OamUiDataTableFilter<Product>[] = [
  {
    id: "visibility",
    label: "Show",
    options: [
      { value: "all", label: "All" },
      { value: "active", label: "In the shop", match: (product) => product.active },
      { value: "hidden", label: "Hidden", match: (product) => !product.active },
      { value: "out", label: "Out of stock", match: (product) => product.stock === 0 },
    ],
  },
];

export const ProductsTable = ({ products, onCreate, onEdit }: ProductsTableProps) => {
  const save = useSaveProduct();
  const remove = useDeleteProduct();

  const columns: OamUiDataTableColumn<Product>[] = [
    {
      id: "name",
      header: "Product",
      sortable: true,
      cell: (product) => (
        <div className="flex items-center gap-3">
          {product.imageUrl ? (
            <img src={resolveImageUrl(product.imageUrl)} alt="" className="size-9 rounded-md object-cover" />
          ) : (
            <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Package className="size-4" />
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.category?.name ?? "No category"}</p>
          </div>
        </div>
      ),
    },
    {
      id: "priceCents",
      header: "Price",
      sortable: true,
      searchable: false,
      className: "text-right",
      cell: (product) => formatMoney(product.priceCents),
    },
    {
      id: "stock",
      header: "Stock",
      sortable: true,
      searchable: false,
      className: "text-right",
      cell: (product) => (product.stock === 0 ? <span className="text-destructive">0</span> : product.stock),
    },
    {
      id: "active",
      header: "Status",
      searchable: false,
      cell: (product) =>
        product.active ? <OamUiBadge>In the shop</OamUiBadge> : <OamUiBadge variant="outline">Hidden</OamUiBadge>,
    },
    {
      id: "updatedAt",
      header: "Updated",
      sortable: true,
      searchable: false,
      className: "max-lg:hidden",
      cell: (product) => formatDateTime(product.updatedAt),
    },
  ];

  const singleRowActions: OamUiRowAction<Product>[] = [
    { label: "Edit", icon: <Pencil />, onSelect: onEdit },
    {
      label: "Hide from the shop",
      icon: <EyeOff />,
      hidden: (product) => !product.active,
      onSelect: (product) => save.mutate({ id: product.id, input: { active: false } }),
    },
    {
      label: "Show in the shop",
      icon: <Eye />,
      hidden: (product) => product.active,
      onSelect: (product) => save.mutate({ id: product.id, input: { active: true } }),
    },
    {
      label: "Delete",
      icon: <Trash2 />,
      destructive: true,
      onSelect: (product) => remove.mutate(product.id),
      confirm: {
        title: "Delete this product?",
        description: ([product]) => `"${product.name}" is removed from the catalogue. Past orders keep their copy.`,
        confirmText: "Delete",
      },
    },
  ];

  return (
    <OamUiDataTable
      data={products}
      getRowId={(product) => product.id}
      columns={columns}
      singleRowActions={singleRowActions}
      filters={filters}
      tableActions={[{ label: "New product", icon: <Plus />, onClick: onCreate }]}
      searchPlaceholder="Search products…"
      emptyText="No products match."
    />
  );
};

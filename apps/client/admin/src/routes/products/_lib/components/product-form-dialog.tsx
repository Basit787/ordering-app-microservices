import { formatMoney, type Product, resolveImageUrl, toCents } from "frontend-common";
import { ImageUp, Package, X } from "lucide-react";
import { Button, OamUiButton, OamUiDialog, OamUiNativeSelect, useAppForm } from "oamui";
import { useEffect, useMemo, useState } from "react";
import { useCategories } from "../../../categories/_lib/api/hook";
import { useSaveProduct } from "../api/hook";

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // null creates a product
  product: Product | null;
};

const required = (label: string) => ({
  onChange: ({ value }: { value: string }) => (value.trim() ? undefined : `${label} is required`),
});

// Prices are typed in rupees and stored in paise
export const ProductFormDialog = ({ open, onOpenChange, product }: ProductFormDialogProps) => {
  const { data: categories = [] } = useCategories();
  const save = useSaveProduct();
  const [image, setImage] = useState<File | "remove">();
  // A picture uploaded to the products service (served from its API), not an external URL
  const hasUpload = !!product?.imageUrl?.startsWith("/products/");
  const objectUrl = useMemo(() => (image instanceof File ? URL.createObjectURL(image) : undefined), [image]);
  useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    },
    [objectUrl],
  );
  const preview = objectUrl ?? (image === "remove" ? undefined : resolveImageUrl(product?.imageUrl));

  const form = useAppForm({
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product ? String(product.priceCents / 100) : "",
      stock: product ? String(product.stock) : "0",
      imageUrl: product?.imageUrl ?? "",
      categoryId: product?.category?.id ?? "",
      active: product?.active ?? true,
    },
    onSubmit: async ({ value }) => {
      await save.mutateAsync({
        id: product?.id,
        input: {
          name: value.name.trim(),
          description: value.description.trim(),
          priceCents: toCents(value.price) ?? 0,
          stock: Number.parseInt(value.stock, 10),
          imageUrl: value.imageUrl.trim() || null,
          categoryId: value.categoryId || null,
          active: value.active,
        },
        image,
      });
      onOpenChange(false);
    },
  });

  return (
    <OamUiDialog
      open={open}
      onOpenChange={onOpenChange}
      title={product ? `Edit ${product.name}` : "New product"}
      className="sm:max-w-lg"
    >
      <form.AppForm>
        <form.Form className="space-y-4">
          <form.AppField name="name" validators={required("Name")}>
            {(field) => <field.TextField label="Name" />}
          </form.AppField>
          <form.AppField name="description">
            {(field) => <field.TextareaField label="Description" rows={3} />}
          </form.AppField>
          <div className="grid grid-cols-2 gap-3">
            <form.AppField
              name="price"
              validators={{
                onChange: ({ value }) => (toCents(value) === null ? "Enter a price in rupees, e.g. 499" : undefined),
              }}
            >
              {(field) => (
                <field.TextField
                  label="Price (₹)"
                  inputMode="decimal"
                  description={
                    toCents(field.state.value) !== null ? formatMoney(toCents(field.state.value) ?? 0) : undefined
                  }
                />
              )}
            </form.AppField>
            <form.AppField
              name="stock"
              validators={{
                onChange: ({ value }) => (/^\d+$/.test(value.trim()) ? undefined : "A whole number, 0 or more"),
              }}
            >
              {(field) => <field.TextField label="Stock" inputMode="numeric" />}
            </form.AppField>
          </div>
          <form.AppField name="categoryId">
            {(field) => (
              <OamUiNativeSelect
                label="Category"
                placeholder="No category"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                options={categories.map((category) => ({ value: category.id, label: category.name }))}
              />
            )}
          </form.AppField>
          <div className="flex items-center gap-3">
            {preview ? (
              <img src={preview} alt="" className="size-16 rounded-lg object-cover" />
            ) : (
              <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Package className="size-6" />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button asChild type="button" variant="outline" size="sm">
                <label className="cursor-pointer">
                  <ImageUp />
                  {image instanceof File ? image.name : "Upload picture"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => setImage(event.target.files?.[0])}
                  />
                </label>
              </Button>
              {(image instanceof File || (hasUpload && image !== "remove")) && (
                <OamUiButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon={<X />}
                  onClick={() => setImage(hasUpload ? "remove" : undefined)}
                >
                  Remove
                </OamUiButton>
              )}
            </div>
          </div>
          <form.AppField
            name="imageUrl"
            validators={{
              onChange: ({ value }) =>
                !value.trim() || /^https?:\/\/\S+$/.test(value.trim()) ? undefined : "Enter a full http(s) URL",
            }}
          >
            {(field) => (
              <field.TextField
                label="…or an image URL"
                placeholder="https://…"
                description="Used when no picture is uploaded"
              />
            )}
          </form.AppField>
          <form.AppField name="active">{(field) => <field.CheckboxField label="Visible in the shop" />}</form.AppField>
          <div className="flex justify-end gap-2">
            <OamUiButton type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </OamUiButton>
            {/* A picked file counts as a change, so the button is not tied to the form being edited */}
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isPristine] as const}>
              {([canSubmit, isSubmitting, isPristine]) => (
                <OamUiButton type="submit" loading={isSubmitting} disabled={!canSubmit || (isPristine && !image)}>
                  {product ? "Save" : "Create"}
                </OamUiButton>
              )}
            </form.Subscribe>
          </div>
        </form.Form>
      </form.AppForm>
    </OamUiDialog>
  );
};

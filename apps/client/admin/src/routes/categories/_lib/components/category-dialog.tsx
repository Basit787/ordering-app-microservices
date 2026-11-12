import type { Category } from "frontend-common";
import { OamUiButton, OamUiDialog, useAppForm } from "oamui";
import { useSaveCategory } from "../api/hook";

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // null creates a category
  category: Category | null;
};

export const CategoryDialog = ({ open, onOpenChange, category }: CategoryDialogProps) => {
  const save = useSaveCategory();
  const form = useAppForm({
    defaultValues: { name: category?.name ?? "" },
    onSubmit: async ({ value }) => {
      await save.mutateAsync({ id: category?.id, name: value.name.trim() });
      onOpenChange(false);
    },
  });

  return (
    <OamUiDialog
      open={open}
      onOpenChange={onOpenChange}
      title={category ? `Rename ${category.name}` : "New category"}
      description={category ? "The link (slug) stays the same." : undefined}
    >
      <form.AppForm>
        <form.Form className="space-y-4">
          <form.AppField
            name="name"
            validators={{ onChange: ({ value }) => (value.trim() ? undefined : "Name is required") }}
          >
            {(field) => <field.TextField label="Name" />}
          </form.AppField>
          <div className="flex justify-end gap-2">
            <OamUiButton type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </OamUiButton>
            <form.SubmitButton>{category ? "Save" : "Create"}</form.SubmitButton>
          </div>
        </form.Form>
      </form.AppForm>
    </OamUiDialog>
  );
};

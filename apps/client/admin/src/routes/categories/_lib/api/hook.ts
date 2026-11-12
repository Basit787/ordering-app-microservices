import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { invalidateKeys } from "frontend-common";
import { useNotification } from "oamui";
import { createCategory, deleteCategory, fetchCategories, renameCategory } from "./api";

// Suspends until loaded; render inside a SuspenseBoundary / lazyComponent
export const useCategories = () => useSuspenseQuery({ queryKey: ["categories"], queryFn: fetchCategories });

const useCategoryMutation = <T>(run: (input: T) => Promise<unknown>, done: string, failed: string) => {
  const queryClient = useQueryClient();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: run,
    onSuccess: () => {
      // Product rows show their category's name
      void invalidateKeys(queryClient, ["categories", "admin-products"]);
      showSuccessNotification(done);
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, failed);
    },
  });
};

export const useSaveCategory = () =>
  useCategoryMutation(
    ({ id, name }: { id?: string; name: string }) => (id ? renameCategory(id, name) : createCategory(name)),
    "Category saved",
    "Could not save the category",
  );

export const useDeleteCategory = () =>
  useCategoryMutation((id: string) => deleteCategory(id), "Category deleted", "Could not delete the category");

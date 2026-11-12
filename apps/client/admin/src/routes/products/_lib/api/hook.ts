import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { ProductInput } from "frontend-common";
import { useNotification } from "oamui";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  removeProductImage,
  updateProduct,
  uploadProductImage,
} from "./api";

// Suspends until loaded; render inside a SuspenseBoundary / lazyComponent
export const useProducts = () => useSuspenseQuery({ queryKey: ["admin-products"], queryFn: fetchProducts });

type SaveProductInput = {
  id?: string;
  input: Partial<ProductInput>;
  // Uploaded after the product is saved; "remove" deletes the uploaded picture
  image?: File | "remove";
};

// Create without an id, update with one; then the picture, which needs the product's id
export const useSaveProduct = () => {
  const queryClient = useQueryClient();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: async ({ id, input, image }: SaveProductInput) => {
      const product = id ? await updateProduct(id, input) : await createProduct(input as ProductInput);
      if (image === "remove") return removeProductImage(product.id);
      return image ? uploadProductImage(product.id, image) : product;
    },
    onSuccess: (product, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      showSuccessNotification(id ? `Saved ${product.name}` : `Created ${product.name}`);
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not save the product");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      showSuccessNotification("Product deleted");
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not delete the product");
    },
  });
};

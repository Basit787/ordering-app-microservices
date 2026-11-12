import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { Role } from "frontend-common";
import { useNotification } from "oamui";
import { fetchUsers, setUserRole } from "./api";

// Suspends until loaded; render inside a SuspenseBoundary / lazyComponent
export const useUsers = () => useSuspenseQuery({ queryKey: ["users"], queryFn: fetchUsers });

export const useSetUserRole = () => {
  const queryClient = useQueryClient();
  const { showSuccessNotification, showErrorNotification } = useNotification();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: Role }) => setUserRole(id, role),
    onSuccess: (user) => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessNotification(`${user.name} is now ${user.role === "admin" ? "an admin" : "a shopper"}`);
    },
    onError: (error) => {
      console.error(error);
      showErrorNotification(error, "Could not change the role");
    },
  });
};

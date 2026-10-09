import { useMutation } from "@tanstack/react-query";
import { updateInventory } from "../api/products";

export const useUpdateInventory = () => {
  return useMutation({
    mutationFn: updateInventory,
  });
};

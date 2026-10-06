import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOrder } from "../api/orders";

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

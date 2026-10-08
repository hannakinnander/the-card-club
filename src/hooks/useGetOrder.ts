import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/orders";

export const useGetOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });
};

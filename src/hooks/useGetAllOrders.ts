import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/orders";

export const QUERY_KEY = ["orders"];

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getAllOrders,
  });
};

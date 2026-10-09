import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/products";

const QUERY_KEY = ["products"];

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getAllProducts,
  });
};

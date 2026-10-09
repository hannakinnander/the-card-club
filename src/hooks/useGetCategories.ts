import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";

const QUERY_KEY = ["categories"];

export const useGetCategories = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCategories,
  });
};

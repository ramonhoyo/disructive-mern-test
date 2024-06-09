import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../categories.api";

export const USE_CATEGORIES_QUERY_KEY = 'categories';

export default function useCategories() {
  return useQuery({
    queryKey: [USE_CATEGORIES_QUERY_KEY],
    queryFn: getCategories,
  });
}

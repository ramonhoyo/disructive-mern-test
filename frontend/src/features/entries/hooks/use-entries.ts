import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../entries.api";

export const ENTRIES_QUERY_KEY = 'entries';

export default function useEntries() {
  return useQuery({
    queryKey: [ENTRIES_QUERY_KEY],
    queryFn: getEntries,
  });
}

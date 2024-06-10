import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../entries.api";

export const ENTRIES_QUERY_KEY = 'entries';

export default function useEntries({ title }: { title: string }) {
  return useQuery({
    queryKey: [ENTRIES_QUERY_KEY, title],
    queryFn: () => getEntries(title),
  });
}

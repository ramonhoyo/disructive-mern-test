import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../entries.api";

export const ENTRIES_QUERY_KEY = 'entries';

export default function useEntries({ title, topics }: { title: string, topics: string[] }) {
  return useQuery({
    queryKey: [ENTRIES_QUERY_KEY, title, ...topics],
    queryFn: () => getEntries(title, topics),
  });
}

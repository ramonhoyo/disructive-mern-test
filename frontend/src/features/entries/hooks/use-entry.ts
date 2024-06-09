import { useQuery } from "@tanstack/react-query";
import { getEntry } from "../entries.api";

export const ENTRIES_QUERY_KEY = 'entries';

export default function useEntries({ entryId }: { entryId: string }) {
  return useQuery({
    queryKey: [ENTRIES_QUERY_KEY, entryId],
    queryFn: () => getEntry(entryId),
  });
}

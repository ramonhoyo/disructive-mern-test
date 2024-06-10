import { useQuery } from "@tanstack/react-query";
import { getEntriesStats } from "../entries.api";

export default function useEntryStatsQuery() {
  return useQuery({
    queryKey: ['entry-stats'],
    queryFn: () => getEntriesStats(),
  });
}

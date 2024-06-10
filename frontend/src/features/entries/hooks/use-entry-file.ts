import { useQuery } from "@tanstack/react-query";
import { getEntryFile } from "../entries.api";

export default function useEntryFile(url: string | undefined) {
  return useQuery({
    queryKey: ['entry-image', url],
    queryFn: () => getEntryFile(url!),
    enabled: !!url,
  });
}

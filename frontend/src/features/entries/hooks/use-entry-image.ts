import { useQuery } from "@tanstack/react-query";
import { getEntryImage } from "../entries.api";

export default function useEntryImage(url: string | undefined) {
  return useQuery({
    queryKey: ['entry-image', url],
    queryFn: () => getEntryImage(url!),
    enabled: !!url,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getTopics } from "./topics.api";

export const TOPICS_QUERY_KEY = "topics";


export default function useTopics() {
  return useQuery({
    queryKey: [TOPICS_QUERY_KEY],
    queryFn: getTopics,
  })
}

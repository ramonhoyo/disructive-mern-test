import { Topic } from "../topics/topics.interfaces";

export interface Entry {
  id: string;
  name: string;
  topic: Topic;
  content: string;
  createdAt: string;
  updatedAt: string;
}

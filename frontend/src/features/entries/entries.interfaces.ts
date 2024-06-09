import { Topic } from "../topics/topics.interfaces";

export interface Entry {
  id: string;
  title: string;
  topic: Topic;
  content: string;
  createdAt: string;
  updatedAt: string;
}

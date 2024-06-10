import { ContentType } from "../categories/categories.interfaces";
import { Topic } from "../topics/topics.interfaces";

export interface EntryMedia {
  uuid: string;
  url: string;
  type: ContentType;
}

export interface Entry {
  id: string;
  title: string;
  topic: Topic;
  media: EntryMedia[];
  content: string;
  createdAt: string;
  updatedAt: string;
}

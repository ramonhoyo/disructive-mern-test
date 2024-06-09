import { Category } from "../categories/categories.interfaces";

export interface Topic {
  id: string;
  title: string;
  img: string;
  category?: Category;
}

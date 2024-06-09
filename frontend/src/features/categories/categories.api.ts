import { axiosInstance } from "@/src/helpers/axios-instance";
import { Category, ContentType } from "./categories.interfaces";

export interface CreateCategoryDto {
  name: string;
  contentTypes: ContentType[],
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get('/categories');
  return data;
};

export const createCategory = async (body: CreateCategoryDto): Promise<Category> => {
  const { data } = await axiosInstance.post('/categories', body);
  return data;
}

import { axiosInstance } from "@/src/helpers/axios-instance";
import { Category } from "./categories.interfaces";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get('/categories');
  return data;
};

export const createCategory = async (name: string): Promise<Category> => {
  const { data } = await axiosInstance.post('/categories', { name });
  return data;
}

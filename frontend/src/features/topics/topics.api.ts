import { axiosInstance } from "@/src/helpers/axios-instance";
import { Topic } from "./topics.interfaces";

export const getTopics = async (): Promise<Topic[]> => {
  const { data } = await axiosInstance.get('/topics');
  return data;
};

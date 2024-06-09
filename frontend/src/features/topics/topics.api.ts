import { axiosInstance } from "@/src/helpers/axios-instance";
import { Topic } from "./topics.interfaces";

export interface CreateTopicDto {
  title: string;
  categoryId: string;
  cover: any;
}

export const getTopics = async (): Promise<Topic[]> => {
  const { data } = await axiosInstance.get('/topics');
  return data;
};

export const createTopic = async (body: CreateTopicDto): Promise<Topic> => {
  const { cover, ...other } = body;

  const formData = new FormData();
  formData.append('cover', cover);
  Object.entries(other).forEach(([key, value]) => {
    console.log(key, value);
    formData.append(key, value);
  });

  const { data } = await axiosInstance.post('/topics', formData);
  return data;
};

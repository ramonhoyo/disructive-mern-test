import { axiosInstance } from "@/src/helpers/axios-instance";
import { Entry } from "./entries.interfaces";

export interface CreateEntryDto {
  title: string;
  content: string;
  topicId: string;
  images: File[];
  texts: File[];
}

export async function getEntries(): Promise<Entry[]> {
  const { data } = await axiosInstance.get('/entries');
  return data;
}

export async function getEntry(entryId: string): Promise<Entry> {
  const { data } = await axiosInstance.get('/entries/' + entryId);
  return data;
}

export async function getMyEntries(): Promise<Entry[]> {
  const { data } = await axiosInstance.get('/entries/mine');
  return data;
}

export async function createEntry(entry: CreateEntryDto) {
  const { images, texts, ...other } = entry;
  const formData = new FormData();

  Object.entries(other).forEach(([key, value]) => {
    formData.append(key, value);
  });

  images?.forEach((file, i) => {
    formData.append(`image-${i}`, file);
  });

  texts?.forEach((file, i) => {
    formData.append(`texts-${i}`, file);
  });

  const { data } = await axiosInstance.post('/entries', formData);
  return data;
}

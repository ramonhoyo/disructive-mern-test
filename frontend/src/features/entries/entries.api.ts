import { axiosInstance } from "@/src/helpers/axios-instance";
import { Entry } from "./entries.interfaces";

export interface CreateEntryDto {
  title: string;
  content: string;
  topicId: string;
  images: File[];
  texts: File[];
  urls: string[];
}

export async function getEntries(title?: string, topics?: string[]): Promise<Entry[]> {
  const params: Record<string, any> = {};
  if (title) {
    params.title = title;
  }
  if (topics) {
    params.topics = topics;
  }
  const { data } = await axiosInstance.get('/entries', { params });
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
  const { images, texts, urls, ...other } = entry;
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

  urls?.forEach((url, index) => {
    formData.append(`urls[${index}]`, url)
  });

  const { data } = await axiosInstance.post('/entries', formData);
  return data;
}


export async function getEntryImage(url: string): Promise<string> {
  const { data } = await axiosInstance.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(data).toString('base64');
}

export async function getEntryFile(url: string) {
  const { data } = await axiosInstance.get(url, { responseType: 'arraybuffer' });
  return data;
}


export async function getEntriesStats() {
  const { data } = await axiosInstance.get('/entries/stats/count');
  return data;
}

import { axiosInstance } from "@/src/helpers/axios-instance";
import { Entry } from "./entries.interfaces";

export interface CreateEntryDto {
  title: string;
  content: string;
  topicId: string;
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
  const { data } = await axiosInstance.post('/entries', entry);
  return data;
}

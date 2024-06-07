import { axiosInstance } from "@/src/helpers/axios-instance";
import { Entry } from "./entries.types";

export async function getEntries() {
  const { data } = await axiosInstance.get('/entries');
  return data;
}

export async function getMyEntries(): Promise<Entry> {
  const { data } = await axiosInstance.get('/entries/mine');
  return data;
}

import { axiosInstance } from "@/src/helpers/axios-instance";

export async function getEntries() {
  const { data } = await axiosInstance.get('/entries');
  return data;
}

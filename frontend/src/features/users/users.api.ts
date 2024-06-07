import { axiosInstance } from "@/src/helpers/axios-instance";
import { User } from "./users.interfaces";

export async function getMe(): Promise<User> {
  const { data } = await axiosInstance.get<User>('/user/me');
  return data;
}

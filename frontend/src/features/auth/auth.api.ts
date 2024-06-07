import { axiosInstance } from "@/src/helpers/axios-instance";
import { User } from "../users/users.interfaces";

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (usernameOrEmail: string): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/auth/login', {
    usernameOrEmail
  });

  return data;
};

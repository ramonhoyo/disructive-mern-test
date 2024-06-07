import { axiosInstance } from "@/src/helpers/axios-instance";
import { User } from "../users/users.interfaces";

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterDto {
  username: string;
  email: string;
  role: 'Reader' | 'Creator';
}

export const login = async (usernameOrEmail: string): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/auth/login', {
    usernameOrEmail
  });

  return data;
};

export async function registerUser(body: RegisterDto) {
  const { data } = await axiosInstance.post('/auth/register', body);
  return data;
}


"use client";
// export an axios client that points to NEXT_PUBLI
import axios, { AxiosInstance } from "axios"

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Configura la URL base de tu API
})

export const updateToken = (token: string) => {
  localStorage.setItem('token', token);
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const removeToken = () => {
  localStorage.removeItem('token');
}

export const getToken = () => {
  let token = localStorage.getItem('token');
  console.log('token', token);
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  return token;
}

getToken(); // Set the token from localStorage

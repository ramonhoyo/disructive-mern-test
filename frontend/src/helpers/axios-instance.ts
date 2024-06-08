"use client";
// export an axios client that points to NEXT_PUBLI
import axios, { AxiosInstance } from "axios"

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Configura la URL base de tu API
})

export const updateToken = (token: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem('token', token);
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const removeToken = () => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem('token');
}

export const getToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  let token = localStorage.getItem('token');
  console.log('token', token);
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  return token;
}

getToken(); // Set the token from localStorage

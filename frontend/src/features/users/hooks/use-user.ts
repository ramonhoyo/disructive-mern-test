"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "../users.interfaces";
import { getMe } from "../users.api";
import { useEffect } from "react";

export function getUserFromLocalStorage() {
  if (typeof window === 'undefined') return null;
  const user = window.localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function saveUserToLocalStorage(user: User) {
  if (typeof window === 'undefined') return null;
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
  if (typeof window === 'undefined') return null;
  window.localStorage.removeItem('user');
}

export function useUser() {
  const query = useQuery<User>({
    queryKey: ['user/me'],
    queryFn: getMe,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    initialData: getUserFromLocalStorage,
  })

  const user = query.data;

  useEffect(() => {
    if (!user) removeUserFromLocalStorage();
    else saveUserToLocalStorage(user);
  }, [user]);

  return query;
}

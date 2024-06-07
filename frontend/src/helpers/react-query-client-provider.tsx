"use client";

import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { useState } from "react";
import { removeToken } from "./axios-instance";
import { removeUserFromLocalStorage } from "../features/users/hooks/use-user";

const errorInterceptor = (error: any) => {
  if (error.message === "Request failed with status code 401") {
    window.location.href = "/login";
    removeToken();
    removeUserFromLocalStorage();
  }
};

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({
      onError: errorInterceptor,
    }),
    mutationCache: new MutationCache({
      onError: errorInterceptor,
    }),
  }));

  return (
    <QueryClientProvider client={queryClient} >{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

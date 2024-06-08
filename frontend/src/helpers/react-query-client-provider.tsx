"use client";

import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { removeToken } from "./axios-instance";
import { removeUserFromLocalStorage } from "../features/users/hooks/use-user";
import { useRouter } from "next/navigation";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const errorInterceptorCallback = useCallback((error: Error) => {
    if (error.message === "Request failed with status code 401") {
      window.location.href = "/login";
      removeToken();
      removeUserFromLocalStorage();
    }
  }, [router]);

  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({
      onError: errorInterceptorCallback,
    }),
    mutationCache: new MutationCache({
      onError: errorInterceptorCallback,
    }),
  }));

  return (
    <QueryClientProvider client={queryClient} >{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

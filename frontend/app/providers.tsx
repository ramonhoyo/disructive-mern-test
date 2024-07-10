"use client"
import ReactQueryProvider from "@/src/helpers/react-query-client-provider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./src/theme";
import { SnackbarProvider } from 'notistack';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ReactQueryProvider>
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </ReactQueryProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

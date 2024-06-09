"use client";
import { Container, Typography } from "@mui/material";
import ProtectedRoute from "../auth/protected-route";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import useEntry from "./hooks/use-entry";

export default function EntryDetailPage({ entryId }: { entryId: string }) {
  const { data: entry, isLoading } = useEntry({ entryId });

  if (isLoading || !entry) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <ResponsiveAppBar />
      <Container maxWidth="md">
        <Typography variant="h4">{entry?.title}</Typography>

        <Typography variant="subtitle1">{entry?.content}</Typography>
      </Container>
    </ProtectedRoute>
  );
}

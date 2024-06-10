"use client";
import { Container } from "@mui/material";
import ProtectedRoute from "../auth/protected-route";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import useEntry from "./hooks/use-entry";
import EntryDetailsCard from "./entry-details.card";

export default function EntryDetailPage({ entryId }: { entryId: string }) {
  const { data: entry, isLoading } = useEntry({ entryId });

  if (isLoading || !entry) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <ResponsiveAppBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <EntryDetailsCard entry={entry} />
      </Container>
    </ProtectedRoute>
  );
}

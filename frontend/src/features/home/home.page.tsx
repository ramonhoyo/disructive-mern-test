"use client";
import { Container } from "@mui/material";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import TopicsCards from "../topics/topics.cards";

export default function EntriesPage() {
  return (
    <main>
      <ResponsiveAppBar />

      <Container sx={{ mt: 4 }}>
        <TopicsCards />
      </Container>
    </main>
  );
}

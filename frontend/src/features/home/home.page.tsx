"use client";
import { Container } from "@mui/material";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import TopicsCards from "../topics/topics.cards";
import EntriesSection from "../entries/entries.section";

export default function HomePage() {
  return (
    <main>
      <ResponsiveAppBar />

      <Container sx={{ mt: 4 }}>
        <TopicsCards />
        <EntriesSection />
      </Container>
    </main>
  );
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../users/hooks/use-user";
import { getEntries } from "./entries.api";
import { useEffect } from "react";
import { Container } from "@mui/material";
import { getTopics } from "../topics/topics.api";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import TopicsCards from "../topics/topics.cards";

export default function EntriesPage() {
  const { data: user } = useUser();
  const { data: entries } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });


  const { data: topics } = useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  });

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  return (
    <main>
      <ResponsiveAppBar />

      <Container sx={{ mt: 4 }}>
        <TopicsCards />
      </Container>
    </main>
  );
}

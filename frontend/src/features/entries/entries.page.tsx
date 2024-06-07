"use client";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../users/hooks/use-user";
import { getEntries } from "./entries.api";
import { useEffect } from "react";

export default function EntriesPage() {
  const { data: user } = useUser();
  const { data: entries } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  return (
    <main>
      <h1>Entries</h1>
      <p>Welcome {user?.username}</p>
    </main>
  );
}

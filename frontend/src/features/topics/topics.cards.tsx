import { useQuery } from "@tanstack/react-query";
import { getTopics } from "./topics.api";
import { Grid, Typography, Card } from "@mui/material";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/topics/covers'

export default function TopicsCards() {
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  });

  return (
    <Grid container spacing={2}>
      {topics?.map(it => (
        <Grid component={Card} sx={{ m: 1 }} item xs={12} sm={3} md={4}>
          <Image
            width={200}
            height={100}
            src={`${baseUrl}/${it.img}`}
            alt={it.title}
          />
          <Typography>{it.title}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}

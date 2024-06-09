import { Grid, Typography, Card } from "@mui/material";
import Image from "next/image";
import useTopics from "./use-topics";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/topics/covers'

export default function TopicsCards() {
  const { data: topics } = useTopics();

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

import { Grid, Typography, Card, CardHeader, CardMedia } from "@mui/material";
import Image from "next/image";
import useTopics from "./use-topics";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/topics/covers'

export default function TopicsCards() {
  const { data: topics } = useTopics();

  return (
    <Grid container spacing={2}>
      {topics?.map(it => (
        <Grid item xs={12} sm={3} md={4}>
          <Card>
            <CardHeader title={it.title} />
            <CardMedia component='img' height={100} width='100%' src={`${baseUrl}/${it.img}`} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

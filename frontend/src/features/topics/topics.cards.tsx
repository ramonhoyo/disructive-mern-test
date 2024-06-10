import { Grid, Typography, Card, CardHeader, CardMedia } from "@mui/material";
import Image from "next/image";
import useTopics from "./use-topics";
import useEntryStatsQuery from "../entries/hooks/use-entry-stats-query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/topics/covers'

export default function TopicsCards() {
  const { data: topics } = useTopics();
  const { data: stats } = useEntryStatsQuery();

  const topicsWithStats = topics?.map(it => {
    return {
      ...it,
      count: stats?.find((stat: any) => stat.topicId === it.id)?.entriesCount || 0
    }
  })

  return (
    <Grid container spacing={2}>
      {topicsWithStats?.map(it => (
        <Grid component={Card} item xs={12} sm={3} md={4}>
          <Card>

            <CardHeader title={it.title} subheader={`${it.count} entries`} />
            <CardMedia component='img' height={100} width='100%' src={`${baseUrl}/${it.img}`} />

          </Card>
        </Grid>
      ))}
    </Grid>
  );
}


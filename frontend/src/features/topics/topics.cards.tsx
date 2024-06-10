import { Grid, Card, CardHeader, CardMedia } from "@mui/material";
import useTopics from "./use-topics";
import useEntryStatsQuery from "../entries/hooks/use-entry-stats-query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/topics/covers'

export default function TopicsCards() {
  const { data: topics } = useTopics();
  const { data: stats } = useEntryStatsQuery();

  const topicsWithStats = topics?.map(it => {
    const count = stats?.find((stat: any) => stat.topicId === it.id)?.entriesCount || 0;
    return {
      ...it,
      count: count > 100 ? '+100' : `${count}`,
    }
  })

  return (
    <Grid container spacing={2}>
      {topicsWithStats?.map(it => (
        <Grid item xs={12} sm={3} md={4}>
          <Card>
            <CardHeader title={it.title} subheader={`${it.count} entries`} />
            <CardMedia component='img' height={100} width='100%' src={`${baseUrl}/${it.img}`} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}


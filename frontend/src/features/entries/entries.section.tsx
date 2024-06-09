import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import useEntries from "./hooks/use-entries";
import { format } from 'date-fns';
import Link from "next/link";

export default function EntriesSection() {
  const { data: entries } = useEntries();


  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography>Hi</Typography>
      </Grid>

      {entries?.map(it => (
        <Grid item xs={12} md={4} xl={3}>
          <Card>
            <CardHeader
              title={it.title}
              subheader={format(it.createdAt, 'dd/mm/yyyy')}
            />

            <CardContent>
              <Typography variant="body2">{it.content}</Typography>
            </CardContent>

            <CardActions>
              <Button LinkComponent={Link} href={`/entries/${it.id}`} size="small">Read More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

import { Grid, Typography } from "@mui/material";
import useEntries from "./hooks/use-entries";
import EntryCard from "./entry.card";

export default function EntriesSection() {
  const { data: entries } = useEntries();

  return (
    <Grid sx={{ mt: 4 }} container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h3">Posts</Typography>
      </Grid>

      {entries?.map(it => (
        <Grid item xs={12} md={4} xl={3}>
          <EntryCard entry={it} />
        </Grid>
      ))}
    </Grid>
  );
}

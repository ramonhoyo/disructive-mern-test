import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import useEntries from "./hooks/use-entries";
import EntryCard from "./entry.card";
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'use-debounce';
import { useState } from "react";

export default function EntriesSection() {
  const [title, setTitle] = useState('');
  const [value] = useDebounce(title, 1000);

  const { data: entries } = useEntries({ title: value });

  return (
    <Grid sx={{ mt: 4 }} container spacing={4}>
      <Grid item xs={12}>
        <Grid container item>
          <Typography sx={{ flex: 1 }} variant="h4">Posts</Typography>
          <TextField
            name="title"
            label='Search'
            value={title}
            onChange={e => setTitle(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      {entries?.map(it => (
        <Grid item xs={12} md={4} xl={3}>
          <EntryCard entry={it} />
        </Grid>
      ))}
    </Grid>
  );
}


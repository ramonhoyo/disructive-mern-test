"use client";
import { Button, Link as MuiLink, Container, Grid, Typography } from "@mui/material";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import MyEntriesTable from "./my-entries.table";
import Link from "next/link";

export default function EntriesPage() {
  return (
    <main>
      <ResponsiveAppBar />

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item container>
            <Typography sx={{ flex: 1 }} variant="h5">My Entries</Typography>
            <Button
              variant="contained"
              LinkComponent={Link}
              href="/entries/new"
            >
              Create a new story
            </Button>
          </Grid>
          <Grid item xs={12}>
            <MyEntriesTable />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

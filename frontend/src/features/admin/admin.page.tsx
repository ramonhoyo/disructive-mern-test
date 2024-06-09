"use client";

import ResponsiveAppBar from "@/src/common/responsive-appbar";
import { Button, Container, Grid, Typography } from "@mui/material";
import CategoriesTable from "../categories/categories.table";
import CategoryFormDialog from "../categories/category-form.dialog";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../categories/categories.api";
import TopicsTable from "../topics/topics.table";
import TopicFormDialog from "../topics/topic-form.dialog";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [topicFormOpen, setTopicFormOpen] = useState(false);

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleOnNewCategoryClick = () => {
    setCategoryFormOpen(true);
  };

  const handleOnNewTopicClick = () => {
    setTopicFormOpen(true);
  };

  useEffect(() => {
    setCategoryFormOpen(false);
  }, [createCategoryMutation.isSuccess]);

  return (
    <>
      <ResponsiveAppBar />

      <Container maxWidth="md">
        <Grid container spacing={2} py={2}>
          <Grid item container>
            <Grid item xs>
              <Typography variant="h5">Categories</Typography>
            </Grid>

            <Grid>
              <Button variant="contained" onClick={handleOnNewCategoryClick}>New</Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CategoriesTable />
          </Grid>


          <Grid item container>
            <Grid item xs>
              <Typography variant="h5">Topics</Typography>
            </Grid>

            <Grid>
              <Button variant="contained" onClick={handleOnNewTopicClick}>New</Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TopicsTable />
          </Grid>
        </Grid>

      </Container>

      <CategoryFormDialog open={categoryFormOpen} setOpen={setCategoryFormOpen} />
      <TopicFormDialog open={topicFormOpen} setOpen={setTopicFormOpen} />
    </>
  );
}

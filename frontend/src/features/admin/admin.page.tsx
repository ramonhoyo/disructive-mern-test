"use client";

import ResponsiveAppBar from "@/src/common/responsive-appbar";
import { Button, Grid, Typography } from "@mui/material";
import CategoriesTable from "../categories/categories.table";
import CategoryFormDialog from "../categories/category-form.dialog";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../categories/categories.api";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleOnNewCategoryClick = () => {
    setCategoryFormOpen(true);
  };

  useEffect(() => {
    setCategoryFormOpen(false);
  }, [createCategoryMutation.isSuccess]);

  return (
    <main>
      <ResponsiveAppBar />

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
      </Grid>

      <CategoryFormDialog open={categoryFormOpen} setOpen={setCategoryFormOpen} />
    </main>
  );
}

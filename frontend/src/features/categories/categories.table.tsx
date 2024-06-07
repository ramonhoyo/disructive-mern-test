"use client";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCategories } from './categories.api';
import { Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Title', width: 150 },
  { field: 'createdAt', headerName: 'Created At', width: 150 },
];

export default function CategoriesTable() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <DataGrid rows={categories || []} columns={columns} getRowId={it => it._id} />
  );
}

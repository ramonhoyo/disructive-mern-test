"use client";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getTopics } from './topics.api';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'createdAt', headerName: 'Created At', width: 150 },
];

export default function TopicsTable() {
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  });

  return (
    <DataGrid rows={topics || []} columns={columns} getRowId={it => it.id} />
  );
}

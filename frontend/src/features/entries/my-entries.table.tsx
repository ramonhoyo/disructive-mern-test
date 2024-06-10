import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getMyEntries } from "./entries.api";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    renderCell: (params) => (
      <MuiLink component={Link} href={`/entries/${params.row.id}`}>
        {params.row.title}
      </MuiLink>
    ),
  },
  { field: 'content', headerName: 'Content', width: 300 },
  {
    field: 'topic.title',
    headerName: 'Topic',
    width: 100,
    renderCell: p => p.row.topic.title,
  },
];

export default function MyEntriesTable() {
  const { data: entries } = useQuery({
    queryKey: ['entries/mine'],
    queryFn: getMyEntries,
  });

  return (
    <DataGrid rows={entries || []} columns={columns} getRowId={it => it.id} />
  );
}

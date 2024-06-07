import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getMyEntries } from "./entries.api";

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'content', headerName: 'Content' },
];

export default function MyEntriesTable() {
  const { data: entries } = useQuery({
    queryKey: ['entries/mine'],
    queryFn: getMyEntries,
  });

  return (
    <DataGrid rows={entries || []} columns={columns} getRowId={it => it._id} />
  );
}

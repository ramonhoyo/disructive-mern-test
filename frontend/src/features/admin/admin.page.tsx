import ResponsiveAppBar from "@/src/common/responsive-appbar";
import { Typography } from "@mui/material";

export default function AdminPage() {
  return (
    <main>
      <ResponsiveAppBar />

      <Typography variant="h3">Admin page</Typography>
    </main>
  );
}

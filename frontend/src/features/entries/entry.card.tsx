import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Entry } from "./entries.interfaces";
import { format } from "date-fns";
import Link from "next/link";
import { ContentType } from "../categories/categories.interfaces";
import useEntryImage from "./hooks/use-entry-image";

export interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard(props: EntryCardProps) {
  const { entry } = props;
  const image = entry.media.find(it => it.type === ContentType.Image);
  const { data: img } = useEntryImage(image?.url);

  return (
    <Card>
      <CardHeader
        title={entry.title}
        subheader={format(entry.createdAt, 'dd/mm/yyyy')}
      />

      {img && (
        <CardMedia component="img" height={198} alt="img" src={`data:image/png;base64, ${img}`} />
      )}

      <CardContent>
        <Typography variant="body2">{entry.content}</Typography>
      </CardContent>

      <CardActions>
        <Button LinkComponent={Link} href={`/entries/${entry.id}`} size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}

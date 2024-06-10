import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Entry } from "./entries.interfaces";
import { format } from "date-fns";
import Link from "next/link";
import { ContentType } from "../categories/categories.interfaces";
import useEntryImage from "./hooks/use-entry-image";
import { getYoutubeThumbnail } from "@/src/helpers/utils";

export interface EntryCardProps {
  entry: Entry;
}

export default function EntryDetailsCard(props: EntryCardProps) {
  const { entry } = props;
  const image = entry.media.find(it => it.type === ContentType.Image);
  const video = entry.media.find(it => it.type === ContentType.Video);

  const { data: img } = useEntryImage(image?.url);

  return (
    <Card>
      <CardHeader
        title={entry.title}
        subheader={`${entry.createdBy.username} ${format(entry.createdAt, 'dd/mm/yyyy')}`}
      />

      {img && (
        <CardMedia component="img" height={198} alt="img" src={`data:image/png;base64, ${img}`} />
      )}

      {!img && !!video && (
        <CardMedia component="img" height={198} alt="img" src={getYoutubeThumbnail(video.url)} />
      )}

      <CardContent>
        <Typography variant="body2">{entry.content}</Typography>



      </CardContent>

      <CardActions>
      </CardActions>
    </Card>
  );
}

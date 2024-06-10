import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Typography } from "@mui/material";
import { Entry } from "./entries.interfaces";
import { format } from "date-fns";
import Link from "next/link";
import { ContentType } from "../categories/categories.interfaces";
import useEntryImage from "./hooks/use-entry-image";
import { getYoutubeThumbnail } from "@/src/helpers/utils";

export interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard(props: EntryCardProps) {
  const { entry } = props;

  const images = entry.media.filter(it => it.type === ContentType.Image);
  const videos = entry.media.filter(it => it.type === ContentType.Video);
  const txts = entry.media.filter(it => it.type === ContentType.Txt);

  const image = images && images[0];
  const video = videos && videos[0];

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

      {!img && !!video && (
        <CardMedia component="img" height={198} alt="img" src={getYoutubeThumbnail(video.url)} />
      )}

      <CardContent>
        <pre>{entry.content}</pre>
      </CardContent>

      <CardActions>
        <Box>
          {images.length > 0 && (<Chip sx={{ mx: 1 }} size="small" color="primary" label={`(${images.length}) Images`} />)}
          {videos.length > 0 && (<Chip sx={{ mx: 1 }} size="small" color="info" label={`(${videos.length}) Videos`} />)}
          {txts.length > 0 && (<Chip sx={{ mx: 1 }} size="small" color="success" label={`(${txts.length}) Txt files`} />)}
        </Box>
        <Button LinkComponent={Link} href={`/entries/${entry.id}`} size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}

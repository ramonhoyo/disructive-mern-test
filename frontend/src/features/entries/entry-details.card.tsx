import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Entry } from "./entries.interfaces";
import { format } from "date-fns";
import Link from "next/link";
import { ContentType } from "../categories/categories.interfaces";
import useEntryImage from "./hooks/use-entry-image";
import { getEmbeedYoutubeUrl, getYoutubeThumbnail } from "@/src/helpers/utils";
import EntryImage from "./entry-image";

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import EntryTxt from "./entry-txt";

export interface EntryCardProps {
  entry: Entry;
}

export default function EntryDetailsCard(props: EntryCardProps) {
  const { entry } = props;
  const video = entry.media.find(it => it.type === ContentType.Video);

  const images = entry.media.filter(it => it.type === ContentType.Image);
  const videos = entry.media.filter(it => it.type === ContentType.Video);
  const txts = entry.media.filter(it => it.type === ContentType.Txt);
  const image = images && images[0];

  const { data: img } = useEntryImage(image?.url);

  return (
    <Card>
      <CardHeader
        title={entry.title}
        subheader={`${entry.createdBy.username} ${format(entry.createdAt, 'dd/mm/yyyy')}`}
      />

      <CardContent>
        <Typography variant="body2">{entry.content}</Typography>

        {images.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Images ({images.length} items)</Typography>
            <Carousel autoPlay sx={{ mt: 4 }}>
              {images.map((image) => (
                <Paper sx={{ flex: 1, m: 2 }}>
                  <EntryImage sx={{ width: '100%' }} url={image.url} />
                </Paper>
              ))}
            </Carousel>
          </Box>
        )}


        {videos.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Videos ({videos.length} urls)</Typography>
            <Carousel autoPlay navButtonsAlwaysVisible sx={{ mt: 4 }}>
              {videos.map((it) => (
                <Paper sx={{ flex: 1, m: 2, justifyContent: 'center' }}>
                  <iframe
                    width="80%"
                    height="400"
                    src={getEmbeedYoutubeUrl(it.url)}
                    title="YouTube video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </Paper>
              ))}
            </Carousel>
          </Box>
        )}

        {txts.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Texts ({txts.length} items)</Typography>
            <Carousel autoPlay={false} navButtonsAlwaysVisible sx={{ mt: 4 }}>
              {txts.map((txt) => (
                <Paper sx={{ flex: 1, mx: 8, mt: 2, p: 2 }}>
                  <EntryTxt sx={{ flex: 1, px: 8 }} url={txt.url} />
                </Paper>
              ))}
            </Carousel>
          </Box>
        )}

      </CardContent>

      <CardActions>
      </CardActions>
    </Card>
  );
}

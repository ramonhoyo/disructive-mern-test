import { Box, Card, CardActions, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { Entry } from "./entries.interfaces";
import { format } from "date-fns";
import { ContentType } from "../categories/categories.interfaces";
import { getEmbeedYoutubeUrl } from "@/src/helpers/utils";
import EntryImage from "./entry-image";

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import EntryTxt from "./entry-txt";

export interface EntryCardProps {
  entry: Entry;
}

export default function EntryDetailsCard(props: EntryCardProps) {
  const { entry } = props;

  const images = entry.media.filter(it => it.type === ContentType.Image);
  const videos = entry.media.filter(it => it.type === ContentType.Video);
  const txts = entry.media.filter(it => it.type === ContentType.Txt);
  const image = images && images[0];


  return (
    <Card>
      <CardHeader
        title={entry.title}
        subheader={`${entry.createdBy.username} ${format(entry.createdAt, 'dd/mm/yyyy')}`}
      />

      <CardContent>
        <Box sx={{ px: 2 }}>
          {images.length > 0 && (<Chip size="small" color="primary" label={`(${images.length}) Images`} />)}
          {videos.length > 0 && (<Chip size="small" color="info" label={`(${videos.length}) Videos`} />)}
          {txts.length > 0 && (<Chip size="small" color="success" label={`(${txts.length}) Txt files`} />)}
        </Box>


        <Typography variant="body2">{entry.content}</Typography>

        {images.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Images ({images.length} items)</Typography>
            <Carousel autoPlay={false} navButtonsAlwaysVisible sx={{ mt: 4 }}>
              {images.map((image) => (
                <Paper key={image.uuid} sx={{ flex: 1, m: 2 }}>
                  <EntryImage style={{ width: '100%' }} url={image.url} />
                </Paper>
              ))}
            </Carousel>
          </Box>
        )}

        {videos.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Videos ({videos.length} urls)</Typography>
            <Carousel height={400} autoPlay={false} navButtonsAlwaysVisible sx={{ mt: 4 }}>
              {videos.map((it) => (
                <Paper key={it.uuid} sx={{ flex: 1, m: 2, justifyContent: 'center' }}>
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
          <>
            <Typography variant="h6">Texts ({txts.length} items)</Typography>
            <Carousel sx={{ mt: 4, overflow: 'scroll' }}>
              {txts.map((txt) => (
                <EntryTxt key={txt.uuid} url={txt.url} />
              ))}
            </Carousel>
          </>
        )}

      </CardContent>
    </Card>
  );
}

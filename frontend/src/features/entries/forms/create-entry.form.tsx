import MultilineTextField from '@/src/components/multiline-text-field';
import { Box, Button, Container, Grid, MenuItem, Paper, Typography } from '@mui/material';
import { Field, Form } from 'formik';
import { Select, TextField } from 'formik-mui';
import useTopics from '../../topics/use-topics';
import { useEffect, useMemo } from 'react';
import { ContentType } from '../../categories/categories.interfaces';
import FormikDropzoneArea from '@/src/components/formik/formik-dropzone-area';
import { MaxFileSize } from '@/src/helpers/consts';
import MultiUrlsTextField from '@/src/components/multi-urls-text-field';


export default function CreateEntryForm({ submitForm, isSubmitting, values, errors }: any) {
  const { data: topics } = useTopics();
  const topic = useMemo(() => {
    console.log(values);
    if (!topics || !values.topicId) return null;
    return topics.find((topic) => topic.id === values.topicId);
  }, [values, topics]);


  const contentTypes = useMemo(() => {
    return {
      txt: topic?.category?.contentTypes?.includes(ContentType.Text),
      image: topic?.category?.contentTypes?.includes(ContentType.Image),
      video: topic?.category?.contentTypes?.includes(ContentType.Video),
      text: topic?.category?.contentTypes?.includes(ContentType.Text),
    }
  }, [topic]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Form>
      <Container sx={{ mt: 4 }} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h5">Create a new entry</Typography>
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              fullWidth
              name="title"
              type="text"
              label="Title"
            />
          </Grid>

          <Grid item xs={12} display='flex'>
            <Field
              component={Select}
              formControl={{ sx: { flex: 1 } }}
              id="topicId"
              name="topicId"
              labelId="topic-select"
              label="Topic"
            >
              {topics?.map((topic) => (
                <MenuItem value={topic.id}>{topic.title}</MenuItem>
              ))}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <Field
              component={MultilineTextField}
              fullWidth
              multiline
              name="content"
              type="textarea"
              label="Content"
            />
          </Grid>

          {contentTypes.text && (
            <Grid item xs={12}>
              <FormikDropzoneArea
                name="texts"
                maxFileSize={MaxFileSize}
                filesLimit={5}
                acceptedFiles={['text/plain']}
                dropzoneText={"Drag and drop TEXT files here or click"}
              />
            </Grid>
          )}

          {contentTypes.image && (
            <Grid item component={Paper} sx={{ p: 4, mt: 4 }} xs={12}>
              <Typography variant="subtitle1">Images</Typography>
              <FormikDropzoneArea
                name="images"
                maxFileSize={MaxFileSize}
                filesLimit={5}
                acceptedFiles={['image/png', 'image/jpeg']}
                dropzoneText={"Drag and drop an image here or click"}
              />
            </Grid>
          )}


          {contentTypes.video && (
            <Grid item component={Paper} sx={{ p: 4, mt: 4 }} xs={12}>
              <Typography variant="h6">Include URLS for the videos </Typography>
              <Typography variant="subtitle1" color="grey">only youtube videos are allowed</Typography>
              <MultiUrlsTextField name="urls" domains={['youtube.com']} />
            </Grid>
          )}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Form>
  );
}

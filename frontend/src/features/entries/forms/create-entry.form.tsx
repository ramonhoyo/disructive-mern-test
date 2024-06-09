import MultilineTextField from '@/src/components/multiline-text-field';
import { Button, Container, Grid, MenuItem, Typography } from '@mui/material';
import { Field, Form, useFormikContext } from 'formik';
import { Select, SimpleFileUpload, TextField } from 'formik-mui';
import useTopics from '../../topics/use-topics';
import { useEffect, useMemo } from 'react';
import { ContentType } from '../../categories/categories.interfaces';
import FormikDropzoneArea from '@/src/components/formik/formik-dropzone-area';
import { MaxFileSize } from '@/src/helpers/consts';


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
            <Grid item xs={12}>
              <FormikDropzoneArea
                name="images"
                maxFileSize={MaxFileSize}
                filesLimit={5}
                acceptedFiles={['image/png', 'image/jpeg']}
                dropzoneText={"Drag and drop an image here or click"}
              />
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

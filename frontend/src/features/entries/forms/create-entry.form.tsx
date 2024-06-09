import MultilineTextField from '@/src/components/multiline-text-field';
import { Button, Container, Grid, MenuItem, Typography } from '@mui/material';
import { Field, Form, useFormikContext } from 'formik';
import { Select, TextField } from 'formik-mui';
import useTopics from '../../topics/use-topics';


export default function CreateEntryForm({ submitForm, isSubmitting }: any) {
  const { data: topics } = useTopics();

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

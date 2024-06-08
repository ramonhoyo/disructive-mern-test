"use client";
import ResponsiveAppBar from "@/src/common/responsive-appbar";
import MultilineTextField from "@/src/components/multiline-text-field";
import { Container, Grid, MenuItem, Typography } from "@mui/material";
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import useTopics from "../topics/use-topics";
import { CreateEntryFormSchema } from "./form-schemas/create-entry.schema";
import { createEntry } from "./entries.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function CreateEntryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: topics } = useTopics();
  const snackbar = useSnackbar();
  const mutation = useMutation({
    mutationFn: createEntry,
  });

  return (
    <main>
      <ResponsiveAppBar />

      <Formik
        initialValues={{
          title: '',
          content: '',
          topicId: '',
        }}
        validationSchema={CreateEntryFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              snackbar.enqueueSnackbar('Post created', { variant: 'success' });
              queryClient.invalidateQueries({ queryKey: ['entries/mine'] });
              router.replace('/entries');
            },
            onError: (err) => {
              console.error(JSON.stringify(err, null, 2));
              snackbar.enqueueSnackbar('Error creating post', { variant: 'error' });
            },
            onSettled: () => {
              setSubmitting(false);
            },
          });
        }}
      >
        {({ submitForm, isSubmitting }) => (
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
        )}
      </Formik>

    </main>
  )
}

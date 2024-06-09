"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, Box, CircularProgress, Grid, MenuItem } from '@mui/material';
import { createTopic } from './topics.api';
import { Field, Form, Formik } from 'formik';
import { Select, TextField } from 'formik-mui';
import useCategories from '../categories/hooks/use-categories';
import ImageInput from '@/src/components/formik/image-input';
import { CreateTopicSchema } from './form-schemas/create-topic.schema';
import { useSnackbar } from 'notistack';
import { TOPICS_QUERY_KEY } from './use-topics';

export interface FormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CategoryFormDialog(props: FormDialogProps) {
  const { open, setOpen } = props;

  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const { data: categories } = useCategories();
  const mutation = useMutation({
    mutationFn: createTopic,
  });

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (mutation.isSuccess) {
      setOpen(false);
    }
  }, [mutation.isSuccess]);

  return (
    <Formik
      initialValues={{
        title: '',
        cover: null,
        categoryId: ''
      }}
      validationSchema={CreateTopicSchema}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values, {
          onSuccess() {
            snackbar.enqueueSnackbar('Topic created', { variant: 'success' })
            queryClient.invalidateQueries({ queryKey: [TOPICS_QUERY_KEY] });
          },
          onSettled: () => setSubmitting(false),
        });
      }}
    >
      {({ submitForm, isSubmitting, values }) => (
        <Form>
          <Dialog
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Create a new Topic</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText>

                    {JSON.stringify(values.cover)}
                    Topics can help identify some posts based on its topic,
                    e.g. sports, music, news, etc.
                  </DialogContentText>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    name="title"
                    label="Title"
                  />
                </Grid>

                <Grid item xs={12} display='flex'>
                  <Field
                    component={Select}
                    formControl={{ sx: { flex: 1 } }}
                    id="categoryId"
                    name="categoryId"
                    labelId="category-select"
                    label="category"
                  >
                    {categories?.map((category) => (
                      <MenuItem value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={ImageInput}
                    name="cover"
                    label="Cover"
                  />
                </Grid>
              </Grid>

              {mutation.error && (
                <Alert color='error'>{mutation.error.message}</Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
              <Button onClick={submitForm} disabled={isSubmitting}>Create</Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
}


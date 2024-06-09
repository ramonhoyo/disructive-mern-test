"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CreateCategorySchema } from './form-schemas/create-category.schema';
import { TextField } from 'formik-mui';
import MultiContentTypeCheckbox from '@/src/components/formik/multi-content-type-checkbox';
import { createCategory } from './categories.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export interface FormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CategoryFormDialog(props: FormDialogProps) {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const { open, setOpen } = props;

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          name: '',
          contentTypes: [],
        }}
        validationSchema={CreateCategorySchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              snackbar.enqueueSnackbar('Category created', { variant: 'success' });
              resetForm();
              handleClose();
            },
            onSettled: () => {
              setSubmitting(false);
            },
          });
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Dialog
              open={open}
              onClose={handleClose}
            >

              <DialogTitle>Create a new Category</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DialogContentText>
                      Categories can help identify some posts based on its category,
                      e.g. images, txt files, youtube video urls, etc.
                    </DialogContentText>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      autoFocus
                      fullWidth
                      name="name"
                      label="Category name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <MultiContentTypeCheckbox name="contentTypes" />
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
    </React.Fragment>
  );
}


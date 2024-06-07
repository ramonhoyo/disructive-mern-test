"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import { createTopic } from './topics.api';

export interface FormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CategoryFormDialog(props: FormDialogProps) {
  const queryClient = useQueryClient();
  const { open, setOpen } = props;
  const [name, setName] = useState('');
  const [cover, setCover] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: createTopic,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnFileChange = (e: any) => {
    setCover(e.target.value);
  };

  React.useEffect(() => {
    if (mutation.isSuccess) {
      setName('');
      setOpen(false);
    }
  }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            mutation.mutate({
              title: name,
              cover: cover!,
            });
          },
        }}
      >
        <DialogTitle>Create a new Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Categories can help identify some posts based on its category,
            e.g. images, txt files, youtube video urls, etc.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            label="Category name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            id="cover"
            name="cover"
            value={cover}
            label="Cover"
            onChange={handleOnFileChange}
            type="file"
            fullWidth variant="standard"
            inputProps={{ accept: 'image/png, image/jpeg' }}
          />


          {mutation.error && (
            <Alert color='error'>{mutation.error.message}</Alert>
          )}

          {(mutation.status == 'pending') && (
            <Box sx={{ my: 1, textAlign: 'center', width: '100%' }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={mutation.isPending}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


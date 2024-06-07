"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { login } from './auth.api';
import { updateToken } from '@/src/helpers/axios-instance';
import { redirect } from 'next/navigation';
import { Button, Card, Container, Grid, TextField, } from '@mui/material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: login
  })

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate(username);
  };

  useEffect(() => {
    if (loginMutation.data) {
      updateToken(loginMutation.data.token);
      queryClient.setQueryData(['user/me'], loginMutation.data.user);
      redirect('/');
    }
  }, [loginMutation.data]);

  return (
    <main>
      <Container component={Card} maxWidth='xs'>
        <form onSubmit={handleOnSubmit}>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label='Username or Email'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs>
              <Button fullWidth type="submit" variant='contained'>Login</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </main>
  );
}

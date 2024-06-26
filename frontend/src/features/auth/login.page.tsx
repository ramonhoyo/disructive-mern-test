"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { login } from './auth.api';
import { updateToken } from '@/src/helpers/axios-instance';
import { redirect } from 'next/navigation';
import { Button, Card, Container, Grid, TextField, Typography, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

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
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Image alt="logo" width={100} height={80} src="/logo.svg" />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5">Wellcome to this test</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label='Username or Email'
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loginMutation.isPending}
                required
              />
            </Grid>

            <Grid item xs>
              <Button fullWidth type="submit" disabled={loginMutation.isPending} variant='contained'>Login</Button>
            </Grid>

            {loginMutation.error && (
              <Grid item xs={12}>
                <Alert severity='error'>{loginMutation.error?.message}</Alert>
              </Grid>
            )}


            <Grid item xs={12}>
              <Typography>Do not have an account? <MuiLink component={Link} href="register">Join us!</MuiLink></Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </main>
  );
}

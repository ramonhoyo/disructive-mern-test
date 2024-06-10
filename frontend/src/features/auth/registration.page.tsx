"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { registerUser } from './auth.api';
import { updateToken } from '@/src/helpers/axios-instance';
import { Button, Card, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function RegistrationPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Reader' | 'Creator' | ''>('');

  const queryClient = useQueryClient()

  const registerUserMutation = useMutation({
    mutationFn: registerUser
  })

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    registerUserMutation.mutate({
      username,
      email,
      role: role as "Reader" | "Creator",
    });
  };

  useEffect(() => {
    if (registerUserMutation.data) {
      updateToken(registerUserMutation.data.token);
      queryClient.setQueryData(['user/me'], registerUserMutation.data.user);
      router.replace('/');
    }
  }, [registerUserMutation.data]);

  return (
    <main>
      <Container component={Card} maxWidth='xs'>
        <form onSubmit={handleOnSubmit}>
          <Grid container spacing={2} px={2} py={4}>
            <Grid item xs={12}>
              <Typography variant="h4">Create an account</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                required
                name="email"
                label='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="username"
                label='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="role-select">Role</InputLabel>
                <Select
                  labelId="role-select"
                  id="demo-simple-select"
                  value={role}
                  label="role"
                  onChange={e => setRole(e.target.value as "Reader" | "Creator")}
                >
                  <MenuItem value="Reader">Reader</MenuItem>
                  <MenuItem value="Creator">Creator</MenuItem>
                </Select>
              </FormControl>
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
